using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

public sealed class GetDeliveryMethodsQuery : Query<List<KeyValuePair<int, string>>>
{
    public GetDeliveryMethodsQuery(Context context) : base(context) { }
}