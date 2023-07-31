using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Extensions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Customers;

internal sealed class GetCustomersQueryHandler : IQueryHandlerAsync<GetCustomersQuery, PagedResult<CustomerListResponse>>
{
    private readonly IAppDbContext _context;

    public GetCustomersQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<CustomerListResponse>> HandleAsync(GetCustomersQuery query, CancellationToken token)
    {
        query.Filter.SetSortStrategy(new CustomerListSortStrategy());
        var sortColumn = query.Filter.SortColumn ?? nameof(Customer.Name);

        var customers = await _context.Customers.AsNoTracking()
            .OrderBy(sortColumn, query.Filter.SortDirection)
            .Skip(query.Filter.SkippedItems)
            .Take(query.Filter.PageSize)
            .Select(c => new CustomerListResponse(
                c.Id,
                c.Name,
                $"{c.PostalAddress.AddressLine1}, {c.PostalAddress.AddressLine2}, {c.PostalAddress.PostalCode} {c.PostalCity.Name}",
                $"{c.DeliveryAddress.AddressLine1}, {c.DeliveryAddress.AddressLine2}, {c.DeliveryAddress.PostalCode} {c.DeliveryCity.Name}"
                )
            )
            .ToListAsync(token);

        var count = await _context.Customers.CountAsync(token);

        return new(customers, count);
    }
}