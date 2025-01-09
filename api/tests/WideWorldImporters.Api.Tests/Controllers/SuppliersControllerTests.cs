using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Suppliers;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Tests.Controllers;

public sealed class SuppliersControllerTests
{
	private readonly IQueryDispatcher _queryDispatcher;
	private readonly SuppliersController _sut;

	public SuppliersControllerTests()
	{
		_queryDispatcher = Substitute.For<IQueryDispatcher>();

		_sut = new(new(1, "test@test.com", null!), _queryDispatcher);
	}

	[Fact]
	public async Task Get_Returns_Paged_List_Result()
	{
		var token = CancellationToken.None;

		var mockList = new List<SupplierListResponse>
		{
			new(1, "Supplier 1", "Categroy 1", "111", "111"),
			new(2, "Supplier 2", "Categroy 2", "222", "222")
		};

		var mockResult = new PagedResult<SupplierListResponse>(mockList, 10);

		_queryDispatcher.HandleAsync<GetSuppliersQuery, PagedResult<SupplierListResponse>>(Arg.Any<GetSuppliersQuery>(), token).Returns(mockResult);

		var result = await _sut.Get(new(), token);

		var resultList = result.Items.ToList();

		resultList.Should().BeEquivalentTo(mockList);
		result.Count.Should().Be(10);
	}

	[Fact]
	public async Task GetById_Returns_A_Supplier()
	{
		var token = CancellationToken.None;
		var response = new SupplierEditResponse(1, "Supplier 1", 1, "0176 11223344", "0176 11223345", "http://test.com", 1, null, null, "Sam Sample");

		_queryDispatcher.HandleAsync<GetSupplierQuery, SupplierEditResponse>(Arg.Any<GetSupplierQuery>(), token).Returns(response);

		var result = await _sut.GetById(new(), token);

		result.Id.Should().Be(response.Id);
		result.Name.Should().Be(response.Name);
	}

	[Fact]
	public async Task GetCategories_Returns_A_List_Of_Key_Value_Pairs()
	{
		var token = CancellationToken.None;
		var mockResult = new List<KeyValuePair<int, string>>
		{
			new(1, "Category 1"),
			new(2, "Category 2"),
			new(3, "Category 3")
		};

		_queryDispatcher.HandleAsync<GetSupplierCategoriesQuery, List<KeyValuePair<int, string>>>(Arg.Any<GetSupplierCategoriesQuery>(), token).Returns(mockResult);

		var result = await _sut.GetCategories(token);

		result.Should().BeEquivalentTo(mockResult);
	}

	[Fact]
	public async Task GetDeliveryMethods_Returns_A_List_Of_Key_Value_Pairs()
	{
		var token = CancellationToken.None;
		var mockResult = new List<KeyValuePair<int, string>>
		{
			new(1, "DeliveryMethod 1"),
			new(2, "DeliveryMethod 2"),
			new(3, "DeliveryMethod 3")
		};

		_queryDispatcher.HandleAsync<GetDeliveryMethodsQuery, List<KeyValuePair<int, string>>>(Arg.Any<GetDeliveryMethodsQuery>(), token).Returns(mockResult);

		var result = await _sut.GetDeliveryMethods(token);

		result.Should().BeEquivalentTo(mockResult);
	}
}