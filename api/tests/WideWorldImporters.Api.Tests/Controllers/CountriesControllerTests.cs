using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Commands.Countries;
using WideWorldImporters.Application.Queries.Countries;
using WideWorldImporters.Application.Queries.States;
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

        result.Should().BeEquivalentTo(response);
    }

    [Fact]
    public async Task GetCountryStates_Returns_A_KeyValueList()
    {
        var token = CancellationToken.None;
        var response = new List<KeyValuePair<int, string>>
        {
            new (1, "State 1"),
            new (2, "State 2")
        };

        _queryDispatcher.HandleAsync<GetCountryStateNamesQuery, List<KeyValuePair<int, string>>>(Arg.Is<GetCountryStateNamesQuery>(a => a.CountryId == 1), Arg.Is(token)).Returns(response);

        var result = await _sut.GetCountryStates(1, token);

        result.Should().BeEquivalentTo(response);
    }

    [Fact]
    public async Task GetNames_Returns_A_KeyValueList()
    {
        var token = CancellationToken.None;
        var response = new List<KeyValuePair<int, string>>
        {
            new (1, "Country 1"),
            new (2, "Country 2")
        };

        _queryDispatcher.HandleAsync<GetCountryNamesQuery, List<KeyValuePair<int, string>>>(Arg.Any<GetCountryNamesQuery>(), Arg.Is(token)).Returns(response);

        var result = await _sut.GetNames(token);

        result.Should().BeEquivalentTo(response);
    }

    [Fact]
    public async Task Update_Returns_BadResult_If_Ids_Do_Not_Match()
    {
        var result = await _sut.Put(2, new(1, "Country 1", "C1", "Region", "Subregion", "Continent", null!, 0), CancellationToken.None);

        await _commandDispatcher.DidNotReceive().HandleAsync(Arg.Any<UpdateCountryCommand>(), Arg.Any<CancellationToken>());
        result.Should().BeOfType<BadRequestResult>();
    }

    [Fact]
    public async Task Update_Returns_Ok()
    {
        var result = await _sut.Put(1, new(1, "Country 1", "C1", "Region", "Subregion", "Continent", null!, 0), CancellationToken.None);

        await _commandDispatcher.Received().HandleAsync(Arg.Is<UpdateCountryCommand>(c => c.Request.Id == 1));
        result.Should().BeOfType<OkResult>();
    }
}