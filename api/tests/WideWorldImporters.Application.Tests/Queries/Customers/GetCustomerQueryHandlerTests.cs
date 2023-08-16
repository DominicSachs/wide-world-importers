using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Queries.Customers;
using WideWorldImporters.Application.Tests.Fakes;

namespace WideWorldImporters.Application.Tests.Queries.Customers;

public sealed class GetCustomerQueryHandlerTests : DbContextTestBase
{
    private readonly GetCustomerQueryHandler _sut;

    public GetCustomerQueryHandlerTests()
    {
        _sut = new(DbContext);

        var faker = new CustomerFaker();
        var customers = faker.Generate(5);

        SaveChanges(context => context.Customers.AddRange(customers));
    }

    [Fact]
    public async Task Get_Customer()
    {
        var query = new GetCustomerQuery(new(1, "", null!), 3);

        var result = await _sut.HandleAsync(query, CancellationToken.None);

        var expected = await DbContext.Customers.Where(c => c.Id == 3)
        .Select(c => new
        {
            c.Id,
            c.Name,
            Phone = c.PhoneNumber,
            Fax = c.FaxNumber,
            PostalAddress = new { c.PostalAddress.AddressLine1, c.PostalAddress.AddressLine2, c.PostalAddress.PostalCode, City = c.PostalCity.Name },
            DeliveryAddress = new { c.DeliveryAddress.AddressLine1, c.DeliveryAddress.AddressLine2, c.DeliveryAddress.PostalCode, City = c.DeliveryCity.Name }
        })
        .SingleAsync();

        result.Should().BeEquivalentTo(expected);
    }
}