using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Application.Tests.Fakes;

namespace WideWorldImporters.Application.Tests.Queries.Suppliers;

public sealed class GetDeliveryMethodsQueryHandlerTests : DbContextTestBase
{
	private readonly GetDeliveryMethodsQueryHandler _sut;

	public GetDeliveryMethodsQueryHandlerTests()
	{
		_sut = new(DbContext);
	}

	[Fact]
	public async Task Gets_DeliveryMethods_As_Key_Value_Pairs()
	{
		var deliveryMethods = new DeliveryMethodFaker().Generate(10);
		SaveChanges(context => context.DeliveryMethods.AddRange(deliveryMethods));

		var query = new GetDeliveryMethodsQuery(new(1, "", null!));

		var result = await _sut.HandleAsync(query, CancellationToken.None);

		var expected = deliveryMethods.Select(d => KeyValuePair.Create(d.Id, d.Name)).ToList();
		result.Should().Equal(expected);
	}
}