using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Queries.States;
using WideWorldImporters.Application.Tests.Fakes;

namespace WideWorldImporters.Application.Tests.Queries.States;

public sealed class GetCountryStateNamesQueryHandlerTests : DbContextTestBase
{
    private readonly GetCountryStateNamesQueryHandler _sut;

    public GetCountryStateNamesQueryHandlerTests()
    {
        _sut = new(DbContext);

        var faker = new StateProvinceFaker();
        var suppliers = faker.Generate(40);

        SaveChanges(context => context.StateProvinces.AddRange(suppliers));
    }

    [Fact]
    public async Task List_Country_State_Names()
    {
        var query = new GetCountryStateNamesQuery(new(1, "", null!), 1);

        var result = await _sut.HandleAsync(query, CancellationToken.None);

        using var context = CreateDbContext();
        var expectedItems = await DbContext.StateProvinces.Where(s => s.CountryId == 1).OrderBy(s => s.Name).Select(c => new KeyValuePair<int, string>(c.Id, c.Name)).ToListAsync();

        result.ToList().Should().BeEquivalentTo(expectedItems);
    }
}