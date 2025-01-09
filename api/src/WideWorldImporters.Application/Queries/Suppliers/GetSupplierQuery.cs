using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

public sealed class GetSupplierQuery : Query<SupplierEditResponse>
{
    public GetSupplierQuery(Context context, int id) : base(context)
    {
        Id = id;
    }

    public int Id { get; }
}