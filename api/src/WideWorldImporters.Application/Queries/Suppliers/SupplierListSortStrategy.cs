using WideWorldImporters.Domain.Abstractions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

internal class SupplierListSortStrategy : SortMapStrategy
{
    protected override void InitializeMap()
    {
        _mappings = new()
        {
            { nameof(SupplierListResponse.Phone), $"{nameof(Supplier.PhoneNumber)}" },
            { nameof(SupplierListResponse.Fax), $"{nameof(Supplier.FaxNumber)}" },
            { nameof(SupplierListResponse.Category), $"{nameof(Supplier.SupplierCategory)}.{nameof(Supplier.SupplierCategory.Name)}" }
        };
    }
}