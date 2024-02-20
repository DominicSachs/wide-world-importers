using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Orders;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Tests.Controllers;

public sealed class OrdersControllerTests
{
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly OrdersController _sut;

    public OrdersControllerTests()
    {
        _queryDispatcher = Substitute.For<IQueryDispatcher>();

        _sut = new(new(1, "test@test.com", null!), _queryDispatcher);
    }

    [Fact]
    public async Task Get_Returns_Paged_List_Result()
    {
        var token = CancellationToken.None;
        var now = DateTime.Now;
        var nowDateOnly = DateOnly.FromDateTime(DateTime.Now);

        var mockList = new List<OrderListResponse>
        {
            new(1, "CPON 1", nowDateOnly, nowDateOnly, "Customer 1", "Contact 1", "LastEditor", now),
            new(2, "CPON 2", nowDateOnly, nowDateOnly, "Customer 2", "Contact 2", "LastEditor", now)
        };

        var mockResult = new PagedResult<OrderListResponse>(mockList, 10);

        _queryDispatcher.HandleAsync<GetOrdersQuery, PagedResult<OrderListResponse>>(Arg.Any<GetOrdersQuery>(), Arg.Is(token)).Returns(mockResult);

        var result = await _sut.Get(new(), token);

        var resultList = result.Items.ToList();

        resultList.Should().BeEquivalentTo(mockList);
        result.Count.Should().Be(10);
    }
}