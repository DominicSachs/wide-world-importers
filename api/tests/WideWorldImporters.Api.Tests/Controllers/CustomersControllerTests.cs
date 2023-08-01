using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Queries.Customers;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Tests.Controllers;

public sealed class CustomersControllerTests
{
    private readonly ICommandDispatcher _commandDispatcher;
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly CustomersController _sut;

    public CustomersControllerTests()
    {
        _commandDispatcher = Substitute.For<ICommandDispatcher>();
        _queryDispatcher = Substitute.For<IQueryDispatcher>();

        _sut = new(new(Guid.NewGuid(), "test@test.com", null!), _queryDispatcher, _commandDispatcher);
    }

    [Fact]
    public async Task Get_Returns_Paged_List_Result()
    {
        var token = CancellationToken.None;

        var mockList = new List<CustomerListResponse>
        {
            new(1, "Foo", "FooPostalAddress", "FooDeliveryAddress"),
            new(2, "Bar", "BarPostalAddress", "BarDeliveryAddress")
        };

        var mockResult = new PagedResult<CustomerListResponse>(mockList, 10);

        _queryDispatcher.HandleAsync<GetCustomersQuery, PagedResult<CustomerListResponse>>(Arg.Any<GetCustomersQuery>(), Arg.Is(token)).Returns(mockResult);

        var result = await _sut.Get(new(), token);

        var resultList = result.Items.ToList();

        resultList.Should().BeEquivalentTo(mockList);
        result.Count.Should().Be(10);
    }

    [Fact]
    public async Task GetById_Returns_A_Customer()
    {
        var token = CancellationToken.None;
        var response = new CustomerEditResponse(
            1,
            "test",
            "1",
            "2",
            new("PostalLine1", "PostalLine2", "PostalPostalCode", "PostalCity"),
            new("DeliveryLine1", "DeliveryLine2", "DeliveryPostalCode", "DeliveryCity")
        );

        _queryDispatcher.HandleAsync<GetCustomerQuery, CustomerEditResponse>(Arg.Is<GetCustomerQuery>(a => a.Id == 1), Arg.Is(token)).Returns(response);

        var result = await _sut.GetById(1, token);

        result.Name.Should().Be("test");
    }

    [Fact]
    public async Task Update_Returns_BadResult_If_Ids_Do_Not_Match()
    {
        var result = await _sut.Put(2, new(1, "Al", "1", "2", null!, null!), CancellationToken.None);

        result.Should().BeOfType<BadRequestResult>();
    }

    [Fact]
    public async Task Update_Returns_Ok()
    {
        var token = CancellationToken.None;

        var result = await _sut.Put(1, new(1, "Al", "1", "2", null!, null!), token);

        result.Should().BeOfType<OkResult>();
    }
}