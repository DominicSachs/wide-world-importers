using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Commands.Countries;
using WideWorldImporters.Application.Queries.Countries;
using WideWorldImporters.Application.Queries.States;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class CountriesController : ControllerBase
{
    private readonly Context _context;
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly ICommandDispatcher _commandDispatcher;

    public CountriesController(Context context, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
    {
        _context = context;
        _queryDispatcher = queryDispatcher;
        _commandDispatcher = commandDispatcher;
    }

    [HttpGet]
    public Task<PagedResult<CountryListResponse>> Get([FromQuery] DataFilter filter, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCountriesQuery, PagedResult<CountryListResponse>>(new(_context, filter), token);
    }

    [HttpGet("names")]
    public Task<List<KeyValuePair<int, string>>> GetNames(CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCountryNamesQuery, List<KeyValuePair<int, string>>>(new(_context), token);
    }

    [HttpGet("{id}")]
    public Task<CountryEditResponse> GetById(int id, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCountryQuery, CountryEditResponse>(new(_context, id), token);
    }

    [HttpGet("{id}/states")]
    public Task<List<KeyValuePair<int, string>>> GetCountryStates(int id, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCountryStateNamesQuery, List<KeyValuePair<int, string>>>(new(_context, id), token);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, CountryEditRequest request, CancellationToken token)
    {
        if (id != request.Id)
        {
            return BadRequest();
        }

        await _commandDispatcher.HandleAsync(new UpdateCountryCommand(_context, request), token);

        return Ok();
    }
}
