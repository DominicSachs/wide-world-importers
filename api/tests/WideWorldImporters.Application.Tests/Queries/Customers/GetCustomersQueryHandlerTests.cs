using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Queries.Customers;
using WideWorldImporters.Application.Tests.Fakes;

namespace WideWorldImporters.Application.Tests.Queries.Customers;

public sealed class GetCustomersQueryHandlerTests : DbContextTestBase
{
    private readonly GetCustomersQueryHandler _sut;

    public GetCustomersQueryHandlerTests()
    {
        _sut = new(DbContext);

        var faker = new CustomerFaker();
        var customers = faker.Generate(20);

        SaveChanges(context => context.Customers.AddRange(customers));
    }

    [Fact]
    public async Task List_Paged_Customers()
    {
        var query = new GetCustomersQuery(new(1, "", null!), new() { Page = 1, PageSize = 10, SortDirection = ListSortDirection.Ascending });

        var result = await _sut.HandleAsync(query, CancellationToken.None);

        using var context = CreateDbContext();
        var expectedItems = await DbContext.Customers.OrderBy(c => c.Name).Skip(10).Take(10)
            .Select(c => new
            {
                c.Id,
                c.Name,
                PostalAddress = $"{c.PostalAddress.AddressLine1}, {c.PostalAddress.AddressLine2}, {c.PostalAddress.PostalCode} {c.PostalCity.Name}",
                DeliveryAddress = $"{c.DeliveryAddress.AddressLine1}, {c.DeliveryAddress.AddressLine2}, {c.DeliveryAddress.PostalCode} {c.DeliveryCity.Name}"
            }).ToListAsync();

        var expectedCount = await DbContext.Customers.CountAsync();

        result.Items.ToList().Should().BeEquivalentTo(expectedItems);
        result.Count.Should().Be(expectedCount);
    }
}