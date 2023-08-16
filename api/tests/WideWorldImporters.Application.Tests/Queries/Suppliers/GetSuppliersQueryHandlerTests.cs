using System.ComponentModel;
using Bogus;
using Bogus.Extensions;
using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Tests.Queries.Suppliers;

public sealed class GetSuppliersQueryHandlerTests : DbContextTestBase
{
    private readonly GetSuppliersQueryHandler _sut;

    public GetSuppliersQueryHandlerTests()
    {
        _sut = new(DbContext);

        var nextId = 1;
        var faker = new Faker<Supplier>()
            .RuleFor(r => r.Id, _ => nextId++)
            .RuleFor(r => r.Name, f => f.Company.CompanyName().ClampLength(max: 100))
            .RuleFor(r => r.PhoneNumber, f => f.Phone.PhoneNumber().ClampLength(max: 20))
            .RuleFor(r => r.FaxNumber, f => f.Phone.PhoneNumber().ClampLength(max: 20))
            .RuleFor(r => r.SupplierCategory, f => new() { Name = f.Commerce.Categories(1)[0] });

        var suppliers = faker.Generate(20);

        SaveChanges(context => context.Suppliers.AddRange(suppliers));

    }

    [Fact]
    public async Task List_Paged_Suppliers()
    {
        var query = new GetSuppliersQuery(new(1, "", null!), new() { Page = 1, PageSize = 10, SortColumn = nameof(Supplier.Name), SortDirection = ListSortDirection.Descending });

        var result = await _sut.HandleAsync(query, CancellationToken.None);

        using var context = CreateDbContext();
        var expectedItems = await DbContext.Suppliers.OrderByDescending(s => s.Name).Skip(10).Take(10)
            .Select(s => new { s.Id, s.Name, Category = s.SupplierCategory.Name, Phone = s.PhoneNumber, Fax = s.FaxNumber }).ToListAsync();

        var expectedCount = await DbContext.Suppliers.CountAsync();

        result.Items.ToList().Should().BeEquivalentTo(expectedItems);
        result.Count.Should().Be(expectedCount);
    }
}