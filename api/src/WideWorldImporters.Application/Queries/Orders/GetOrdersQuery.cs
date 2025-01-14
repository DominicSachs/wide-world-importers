using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Orders;

public sealed class GetOrdersQuery : Query<PagedResult<OrderListResponse>>
{
    public GetOrdersQuery(Context context, DataFilter filter, int? customerId) : base(context)
    {
        Filter = filter;
        CustomerId = customerId;
    }

    public DataFilter Filter { get; }
    public int? CustomerId { get; }
}