using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Orders;

public sealed class GetOrdersQuery : Query<PagedResult<OrderListResponse>>
{
    public GetOrdersQuery(Context context, DataFilter filter) : base(context)
    {
        Filter = filter;
    }

    public DataFilter Filter { get; }
}