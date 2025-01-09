using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Application.Tests.Fakes;

namespace WideWorldImporters.Application.Tests.Queries.Suppliers;

public sealed class GetSupplierCategoriesQueryHandlerTests : DbContextTestBase
{
	private readonly GetSupplierCategoriesQueryHandler _sut;

	public GetSupplierCategoriesQueryHandlerTests()
	{
		_sut = new(DbContext);
	}

	[Fact]
	public async Task Gets_SupplierCategories_As_Key_Value_Pairs()
	{
		var supplierCategories = new SupplierCategoryFaker().Generate(10);
		SaveChanges(context => context.SupplierCategories.AddRange(supplierCategories));

		var query = new GetSupplierCategoriesQuery(new(1, "", null!));

		var result = await _sut.HandleAsync(query, CancellationToken.None);

		var expected = supplierCategories.Select(d => KeyValuePair.Create(d.Id, d.Name)).ToList();
		result.Should().Equal(expected);
	}
}