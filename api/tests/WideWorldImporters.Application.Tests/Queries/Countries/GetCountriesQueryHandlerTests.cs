using System.ComponentModel;
using Bogus;
using Bogus.Extensions;
using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Tests;
using WideWorldImporters.Application.Tests.Fakes;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Queries.Countries;

public sealed class GetCountriesQueryHandlerTests : DbContextTestBase
{
    private readonly GetCountriesQueryHandler _sut;

    public GetCountriesQueryHandlerTests()
    {
        _sut = new(DbContext);

        var nextId = 1;
        var stateFaker = new StateProvinceFaker();
        var faker = new Faker<Country>()
            .RuleFor(r => r.Id, _ => nextId++)
            .RuleFor(r => r.Name, f => f.Address.Country().ClampLength(max: 60))
            .RuleFor(r => r.FormalName, f => f.Address.Country().ClampLength(max: 60))
            .RuleFor(r => r.Region, f => "Europe")
            .RuleFor(r => r.Subregion, f => "South Europe")
            .RuleFor(r => r.Continent, f => "Europe")
            .RuleFor(r => r.Continent, f => "Europe")
            .RuleFor(r => r.LatestRecordedPopulation, f => f.Random.Int(3459, 11_345_698))
            .RuleFor(r => r.StateProvinces, f => stateFaker.Generate(f.Random.Int(4, 53)));

        var countries = faker.Generate(20);

        SaveChanges(context => context.Countries.AddRange(countries));
    }

    [Fact]
    public async Task List_Paged_Countries()
    {
        var query = new GetCountriesQuery(new(1, "", null!), new() { Page = 1, PageSize = 10, SortColumn = nameof(Country.LatestRecordedPopulation), SortDirection = ListSortDirection.Descending });

        var result = await _sut.HandleAsync(query, CancellationToken.None);

        using var context = CreateDbContext();
        var expectedItems = await DbContext.Countries
            .OrderByDescending(c => c.LatestRecordedPopulation).Skip(10).Take(10)
            .Select(c => new { c.Id, c.Name, c.FormalName, c.Region, c.Subregion, c.Continent, StateProvinceCount = c.StateProvinces.Count(), Population = c.LatestRecordedPopulation })
            .ToListAsync();

        var expectedCount = await DbContext.Countries.CountAsync();

        result.Items.ToList().Should().BeEquivalentTo(expectedItems);
        result.Count.Should().Be(expectedCount);
    }
}