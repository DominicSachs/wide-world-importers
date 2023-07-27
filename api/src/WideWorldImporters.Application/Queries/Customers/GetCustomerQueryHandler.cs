using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.CustomerSpecifications;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Customers;

internal sealed class GetCustomerQueryHandler : IQueryHandlerAsync<GetCustomerQuery, CustomerEditResponse>
{
    private readonly IAppDbContext _context;

    public GetCustomerQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<CustomerEditResponse> HandleAsync(GetCustomerQuery query, CancellationToken token)
    {
        var expression = new CustomerIdSpecification(query.Id).ToExpression();

        return _context.Customers.AsNoTracking()
            .Where(expression)
            .Select(c => new CustomerEditResponse(
                c.Id,
                c.Name,
                c.PhoneNumber,
                c.FaxNumber,
                new(c.PostalAddress.AddressLine1, c.PostalAddress.AddressLine2, c.PostalAddress.PostalCode, c.PostalCity.Name),
                new(c.DeliveryAddress.AddressLine1, c.DeliveryAddress.AddressLine2, c.DeliveryAddress.PostalCode, c.DeliveryCity.Name))
            )
            .SingleAsync(token);
    }
}