using WideWorldImporters.Domain.Abstractions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Customers;

internal sealed class CustomerListSortStrategy : SortMapStrategy
{
    protected override void InitializeMap()
    {
        _mappings = new()
        {
            { nameof(CustomerListResponse.PostalAddress), $"{nameof(Customer.PostalCity)}.{nameof(Customer.PostalCity.Name)}" },
            { nameof(CustomerListResponse.DeliveryAddress), $"{nameof(Customer.DeliveryCity)}.{nameof(Customer.DeliveryCity.Name)}" }
        };
    }
}