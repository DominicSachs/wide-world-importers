using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

public sealed class GetSupplierCategoriesQuery : Query<List<KeyValuePair<int, string>>>
{
    public GetSupplierCategoriesQuery(Context context) : base(context) { }
}