using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Countries;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Tests.Controllers;

public sealed class CountriesControllerTests
{
    private readonly ICommandDispatcher _commandDispatcher;
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly CountriesController _sut;

    public CountriesControllerTests()
    {
        _commandDispatcher = Substitute.For<ICommandDispatcher>();
        _queryDispatcher = Substitute.For<IQueryDispatcher>();

        _sut = new(new(1, "test@test.com", null!), _queryDispatcher, _commandDispatcher);
    }

    [Fact]
    public async Task Get_Returns_Paged_List_Result()
    {
        var token = CancellationToken.None;

        var mockList = new List<CountryListResponse>
        {
            new(1, "Country 1", "Country 1", "Region 1", "Subregion 1", "Continent 1", 1, null),
            new(2, "Country 2", "Country 2", "Region 2", "Subregion 2", "Continent 2", 2, 1000)
        };

        var mockResult = new PagedResult<CountryListResponse>(mockList, 10);

        _queryDispatcher.HandleAsync<GetCountriesQuery, PagedResult<CountryListResponse>>(Arg.Any<GetCountriesQuery>(), Arg.Is(token)).Returns(mockResult);

        var result = await _sut.Get(new(), token);

        var resultList = result.Items.ToList();

        resultList.Should().BeEquivalentTo(mockList);
        result.Count.Should().Be(10);
    }

    [Fact]
    public async Task GetById_Returns_A_Country()
    {
        var token = CancellationToken.None;
        var response = new CountryEditResponse(1, "Country 1", "Country 1", "Region 1", "Subregion 1", "Continent 1", null!, 1);

        _queryDispatcher.HandleAsync<GetCountryQuery, CountryEditResponse>(Arg.Is<GetCountryQuery>(a => a.Id == 1), Arg.Is(token)).Returns(response);

        var result = await _sut.GetById(1, token);

        result.Name.Should().Be("Country 1");
    }

    [Fact]
    public async Task Update_Returns_BadResult_If_Ids_Do_Not_Match()
    {
        var result = await _sut.Put(2, new(1, "Coountry 1", "C1", "Region", "Subregion", "Continent", null!, 0), CancellationToken.None);

        result.Should().BeOfType<BadRequestResult>();
    }

    [Fact]
    public async Task Update_Returns_Ok()
    {
        var token = CancellationToken.None;

        var result = await _sut.Put(1, new(1, "Coountry 1", "C1", "Region", "Subregion", "Continent", null!, 0), token);

        result.Should().BeOfType<OkResult>();
    }
}