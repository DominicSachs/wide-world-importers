using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Customers;

public sealed class GetCustomersQuery : Query<PagedResult<CustomerListResponse>>
{
    public GetCustomersQuery(Context context, DataFilter filter) : base(context)
    {
        Filter = filter;
    }

    public DataFilter Filter { get; }
}