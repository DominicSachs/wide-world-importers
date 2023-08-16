using WideWorldImporters.Application.Queries.Customers;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Tests.Queries.Customers;

public sealed class CustomerListSortStrategyTests
{
    private readonly CustomerListSortStrategy _testObject;

    public CustomerListSortStrategyTests()
    {
        _testObject = new();
    }

    [Theory]
    [InlineData(nameof(CustomerListResponse.PostalAddress), $"{nameof(Customer.PostalCity)}.{nameof(Customer.PostalCity.Name)}")]
    [InlineData(nameof(CustomerListResponse.DeliveryAddress), $"{nameof(Customer.DeliveryCity)}.{nameof(Customer.DeliveryCity.Name)}")]
    public void Map_Returns_CorrectPropertyNames(string fromProperty, string toProperty)
    {
        _testObject.Map(fromProperty).Should().Be(toProperty);
    }
}