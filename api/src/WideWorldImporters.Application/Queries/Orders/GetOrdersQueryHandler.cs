using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Extensions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Orders;

internal sealed class GetOrdersQueryHandler : IQueryHandlerAsync<GetOrdersQuery, PagedResult<OrderListResponse>>
{
    private readonly IAppDbContext _context;

    public GetOrdersQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<OrderListResponse>> HandleAsync(GetOrdersQuery query, CancellationToken token)
    {
        query.Filter.SetSortStrategy(new OrderListSortStrategy());
        var sortColumn = query.Filter.SortColumn ?? nameof(Order.OrderedOn);

        var orders = await _context.Orders.AsNoTracking()
            .OrderBy(sortColumn, query.Filter.SortDirection)
            .Skip(query.Filter.SkippedItems)
            .Take(query.Filter.PageSize)
            .Select(o => new OrderListResponse(
                o.Id,
                o.CustomerPurchaseOrderNumber,
                o.OrderedOn,
                o.ExpectedDeliveryOn,
                o.Customer.Name,
                o.ContactPerson.FullName,
                o.LastEditedBy.FullName,
                o.LastEditedAt
                )
            )
            .ToListAsync(token);

        var count = await _context.Orders.CountAsync(token);

        return new(orders, count);
    }
}