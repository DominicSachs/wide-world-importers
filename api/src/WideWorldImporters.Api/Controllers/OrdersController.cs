using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Orders;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public sealed class OrdersController : ControllerBase
{
    private readonly Context _context;
    private readonly IQueryDispatcher _queryDispatcher;

    public OrdersController(Context context, IQueryDispatcher queryDispatcher)
    {
        _context = context;
        _queryDispatcher = queryDispatcher;
    }

    [HttpGet]
    public Task<PagedResult<OrderListResponse>> Get([FromQuery] DataFilter filter, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetOrdersQuery, PagedResult<OrderListResponse>>(new(_context, filter), token);
    }
}
