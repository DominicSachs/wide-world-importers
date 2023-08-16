using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Tests.Queries.Suppliers;

public sealed class SupplierListSortStrategyTests
{
    private readonly SupplierListSortStrategy _testObject;

    public SupplierListSortStrategyTests()
    {
        _testObject = new();
    }

    [Theory]
    [InlineData(nameof(SupplierListResponse.Phone), $"{nameof(Supplier.PhoneNumber)}")]
    [InlineData(nameof(SupplierListResponse.Fax), $"{nameof(Supplier.FaxNumber)}")]
    [InlineData(nameof(SupplierListResponse.Category), $"{nameof(Supplier.SupplierCategory)}.{nameof(Supplier.SupplierCategory.Name)}")]
    public void Map_Returns_CorrectPropertyNames(string fromProperty, string toProperty)
    {
        _testObject.Map(fromProperty).Should().Be(toProperty);
    }
}