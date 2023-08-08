using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Commands.Cities;
using WideWorldImporters.Application.Queries.Cities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Tests.Controllers;

public sealed class CitiesControllerTests
{
    private readonly ICommandDispatcher _commandDispatcher;
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly CitiesController _sut;

    public CitiesControllerTests()
    {
        _commandDispatcher = Substitute.For<ICommandDispatcher>();
        _queryDispatcher = Substitute.For<IQueryDispatcher>();

        _sut = new(new(1, "test@test.com", null!), _queryDispatcher, _commandDispatcher);
    }

    [Fact]
    public async Task Get_Returns_Paged_List_Result()
    {
        var token = CancellationToken.None;

        var mockList = new List<CityListResponse>
        {
            new(1, "City 1", "State 1", "Country 1", null),
            new(2, "City 2", "State 2", "Country 2", 1000)
        };

        var mockResult = new PagedResult<CityListResponse>(mockList, 10);

        _queryDispatcher.HandleAsync<GetCitiesQuery, PagedResult<CityListResponse>>(Arg.Any<GetCitiesQuery>(), Arg.Is(token)).Returns(mockResult);

        var result = await _sut.Get(new(), token);

        var resultList = result.Items.ToList();

        resultList.Should().BeEquivalentTo(mockList);
        result.Count.Should().Be(10);
    }

    [Fact]
    public async Task GetById_Returns_A_City()
    {
        var token = CancellationToken.None;
        var response = new CityEditResponse(1, "City 1", 1, 2, 1000);

        _queryDispatcher.HandleAsync<GetCityQuery, CityEditResponse>(Arg.Is<GetCityQuery>(a => a.Id == 1), Arg.Is(token)).Returns(response);

        var result = await _sut.GetById(1, token);

        result.Should().BeEquivalentTo(response);
    }

    [Fact]
    public async Task Update_Returns_BadResult_If_Ids_Do_Not_Match()
    {
        var result = await _sut.Put(2, new(1, "City 1", 2, 1000), CancellationToken.None);

        await _commandDispatcher.DidNotReceive().HandleAsync(Arg.Any<UpdateCityCommand>(), Arg.Any<CancellationToken>());
        result.Should().BeOfType<BadRequestResult>();
    }

    [Fact]
    public async Task Update_Returns_Ok()
    {
        var result = await _sut.Put(1, new(1, "City 1", 2, 1000), CancellationToken.None);

        await _commandDispatcher.Received().HandleAsync(Arg.Is<UpdateCityCommand>(c => c.Request.Id == 1));
        result.Should().BeOfType<OkResult>();
    }

    [Fact]
    public async Task Create_Calls_Correct_Command()
    {
        await _sut.Post(new("City 1", 2, 1000), CancellationToken.None);

        await _commandDispatcher.Received().HandleAsync(Arg.Is<CreateCityCommand>(c => c.Request.Name == "City 1"));
    }
}