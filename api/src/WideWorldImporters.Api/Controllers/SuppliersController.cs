using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Customers;
using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
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

    [HttpGet("{id:int}")]
    public Task<SupplierEditResponse> GetById(int id, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetSupplierQuery, SupplierEditResponse>(new(_context, id), token);
    }
    
    [HttpGet("categories")]
    public Task<List<KeyValuePair<int, string>>> GetCategories(CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetSupplierCategoriesQuery, List<KeyValuePair<int, string>>>(new(_context), token);
    }
    
    [HttpGet("delivery-methods")]
    public Task<List<KeyValuePair<int, string>>> GetDeliveryMethods(CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetSupplierCategoriesQuery, List<KeyValuePair<int, string>>>(new(_context), token);
    }
}
