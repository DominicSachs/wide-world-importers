using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

public sealed class GetSuppliersQuery : Query<PagedResult<SupplierListResponse>>
{
    public GetSuppliersQuery(Context context, DataFilter filter) : base(context)
    {
        Filter = filter;
    }

    public DataFilter Filter { get; }
}