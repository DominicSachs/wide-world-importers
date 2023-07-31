using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class SuppliersController : ControllerBase
{
    private readonly Context _context;
    private readonly IQueryDispatcher _queryDispatcher;

    public SuppliersController(Context context, IQueryDispatcher queryDispatcher)
    {
        _context = context;
        _queryDispatcher = queryDispatcher;
    }

    [HttpGet]
    public Task<PagedResult<SupplierListResponse>> Get([FromQuery] DataFilter filter, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetSuppliersQuery, PagedResult<SupplierListResponse>>(new(_context, filter), token);
    }
}
