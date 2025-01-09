using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Application.Tests.Fakes;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Tests.Queries.Suppliers;

public sealed class GetSuppliersQueryHandlerTests : DbContextTestBase
{
	private readonly GetSuppliersQueryHandler _sut;

	public GetSuppliersQueryHandlerTests()
	{
		_sut = new(DbContext);
	}

	[Fact]
	public async Task List_Paged_Suppliers()
	{
		var suppliers = new SupplierFaker().Generate(20);
		SaveChanges(context => context.Suppliers.AddRange(suppliers));

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