using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Application.Tests.Fakes;

namespace WideWorldImporters.Application.Tests.Queries.Suppliers;

public sealed class GetSupplierQueryHandlerTests : DbContextTestBase
{
	private readonly GetSupplierQueryHandler _sut;

	public GetSupplierQueryHandlerTests()
	{
		_sut = new(DbContext);
	}

	[Fact]
	public async Task List_Paged_Suppliers()
	{
		var suppliers = new SupplierFaker().Generate(2);
		SaveChanges(context => context.Suppliers.AddRange(suppliers));

		var query = new GetSupplierQuery(new(1, "", null!), suppliers[0].Id);

		var result = await _sut.HandleAsync(query, CancellationToken.None);

		var expected = suppliers[0];

		result.Id.Should().Be(expected.Id);
	}
}