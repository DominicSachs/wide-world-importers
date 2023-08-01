using System.ComponentModel;
using WideWorldImporters.Application.Tests;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Queries.Countries;

public sealed class GetCountriesQueryHandlerTests : DbContextTestBase
{
    private readonly GetCountriesQueryHandler _sut;

    public GetCountriesQueryHandlerTests()
    {
        _sut = new(DbContext);

        SaveChanges(context =>
        {
            context.Countries.Add(new() { Id = 1, Name = "Country 1", FormalName = "C1", Region = "R1", Subregion = "SR1", Continent = "C1", LatestRecordedPopulation = 1 });
            context.Countries.Add(new() { Id = 2, Name = "Country 2", FormalName = "C2", Region = "R2", Subregion = "SR2", Continent = "C2", LatestRecordedPopulation = 2 });
            context.Countries.Add(new() { Id = 3, Name = "Country 3", FormalName = "C3", Region = "R3", Subregion = "SR3", Continent = "C3", LatestRecordedPopulation = 4 });
            context.Countries.Add(new() { Id = 4, Name = "Country 4", FormalName = "C4", Region = "R4", Subregion = "SR4", Continent = "C4", LatestRecordedPopulation = 5 });
            context.Countries.Add(new() { Id = 5, Name = "Country 5", FormalName = "C5", Region = "R5", Subregion = "SR5", Continent = "C5", LatestRecordedPopulation = 1 });
        });
    }

    [Fact]
    public async Task List_Paged_Countries()
    {
        var query = new GetCountriesQuery(new(Guid.Empty, "", null!), new() { Page = 0, PageSize = 2, SortColumn = nameof(Country.LatestRecordedPopulation), SortDirection = ListSortDirection.Descending });

        var result = await _sut.HandleAsync(query, CancellationToken.None);

        result.Count.Should().Be(5);
        result.Items.Count().Should().Be(2);
        result.Items.First().Name.Should().Be("Country 4");
        result.Items.Last().Name.Should().Be("Country 3");
    }
}