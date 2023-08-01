using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Countries;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Tests.Controllers;

public sealed class CountriesControllerTests
{
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly CountriesController _sut;

    public CountriesControllerTests()
    {
        _queryDispatcher = Substitute.For<IQueryDispatcher>();

        _sut = new(new(Guid.NewGuid(), "test@test.com", null!), _queryDispatcher);
    }

    [Fact]
    public async Task Get_Returns_Paged_List_Result()
    {
        var token = CancellationToken.None;

        var mockList = new List<CountryListResponse>
        {
            new(1, "Country 1", "Country 1", "Region 1", "Subregion 1", "Continent 1", null),
            new(2, "Country 2", "Country 2", "Region 2", "Subregion 2", "Continent 2", 1000)
        };

        var mockResult = new PagedResult<CountryListResponse>(mockList, 10);

        _queryDispatcher.HandleAsync<GetCountriesQuery, PagedResult<CountryListResponse>>(Arg.Any<GetCountriesQuery>(), Arg.Is(token)).Returns(mockResult);

        var result = await _sut.Get(new(), token);

        var resultList = result.Items.ToList();

        resultList.Should().BeEquivalentTo(mockList);
        result.Count.Should().Be(10);
    }
}