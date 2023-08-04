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

        _queryDispatcher.HandleAsync<GetSuppliersQuery, PagedResult<SupplierListResponse>>(Arg.Any<GetSuppliersQuery>(), Arg.Is(token)).Returns(mockResult);

        var result = await _sut.Get(new(), token);

        var resultList = result.Items.ToList();

        resultList.Should().BeEquivalentTo(mockList);
        result.Count.Should().Be(10);
    }
}