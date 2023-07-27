using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Commands.Customers;
using WideWorldImporters.Application.Queries.Customers;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class CustomersController : ControllerBase
{
    private readonly Context _context;
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly ICommandDispatcher _commandDispatcher;

    public CustomersController(Context context, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
    {
        _context = context;
        _queryDispatcher = queryDispatcher;
        _commandDispatcher = commandDispatcher;
    }

    [HttpGet]
    public Task<PagedResult<CustomerListResponse>> Get([FromQuery] DataFilter filter, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCustomersQuery, PagedResult<CustomerListResponse>>(new(_context, filter), token);
    }

    [HttpGet("{id}")]
    public Task<CustomerEditResponse> GetById(int id, CancellationToken token)
    {
        return _queryDispatcher.HandleAsync<GetCustomerQuery, CustomerEditResponse>(new(_context, id), token);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put(int id, CustomerEditRequest request, CancellationToken token)
    {
        if (id != request.Id)
        {
            return BadRequest();
        }

        await _commandDispatcher.HandleAsync(new UpdateCustomerCommand(_context, request), token);

        return Ok();
    }
}
