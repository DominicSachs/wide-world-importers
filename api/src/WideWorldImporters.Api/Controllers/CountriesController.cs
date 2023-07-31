using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Countries;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class CountriesController : ControllerBase
{
    private readonly Context _context;
    private readonly IQueryDispatcher _queryDispatcher;

    public CountriesController(Context context, IQueryDispatcher queryDispatcher)
    {
        _context = context;
        _queryDispatcher = queryDispatcher;
    }

    [HttpGet]
    public Task<PagedResult<CountryListResponse>> Get([FromQuery] DataFilter filter, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCountriesQuery, PagedResult<CountryListResponse>>(new(_context, filter), token);
    }
}
