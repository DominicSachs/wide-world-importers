using WideWorldImporters.Domain.Abstractions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Orders;

internal sealed class OrderListSortStrategy : SortMapStrategy
{
    protected override void InitializeMap()
    {
        _mappings = new()
        {
            { nameof(OrderListResponse.CustomerName), $"{nameof(Order.Customer)}.{nameof(Order.Customer.Name)}" },
            { nameof(OrderListResponse.ContactName), $"{nameof(Order.ContactPerson)}.{nameof(Order.ContactPerson.FullName)}" },
            { nameof(OrderListResponse.LastEditedByName), $"{nameof(Order.LastEditedBy)}.{nameof(Order.LastEditedBy.FullName)}" }
        };
    }
}