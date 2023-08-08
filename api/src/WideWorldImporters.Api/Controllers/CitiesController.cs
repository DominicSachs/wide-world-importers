using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Commands.Cities;
using WideWorldImporters.Application.Queries.Cities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class CitiesController : ControllerBase
{
    private readonly Context _context;
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly ICommandDispatcher _commandDispatcher;

    public CitiesController(Context context, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
    {
        _context = context;
        _queryDispatcher = queryDispatcher;
        _commandDispatcher = commandDispatcher;
    }

    [HttpGet]
    public Task<PagedResult<CityListResponse>> Get([FromQuery] DataFilter filter, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCitiesQuery, PagedResult<CityListResponse>>(new(_context, filter), token);
    }

    [HttpGet("{id}")]
    public Task<CityEditResponse> GetById(int id, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCityQuery, CityEditResponse>(new(_context, id), token);
    }

    [HttpPost]
    public async Task Post(CityCreateRequest request, CancellationToken token)
    {
        await _commandDispatcher.HandleAsync(new CreateCityCommand(_context, request), token);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, CityEditRequest request, CancellationToken token)
    {
        if (id != request.Id)
        {
            return BadRequest();
        }

        await _commandDispatcher.HandleAsync(new UpdateCityCommand(_context, request), token);

        return Ok();
    }
}
