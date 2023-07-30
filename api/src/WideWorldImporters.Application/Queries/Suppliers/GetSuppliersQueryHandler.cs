using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Customers;

internal sealed class GetSuppliersQueryHandler : IQueryHandlerAsync<GetSuppliersQuery, PagedResult<SupplierListResponse>>
{
    private readonly IAppDbContext _context;

    public GetSuppliersQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<SupplierListResponse>> HandleAsync(GetSuppliersQuery query, CancellationToken token)
    {
        var sortColumn = query.Filter.SortColumn ?? nameof(Supplier.Name);

        var suppliers = await _context.Suppliers.AsNoTracking()
            .Skip(query.Filter.SkippedItems)
            .Take(query.Filter.PageSize)
            .Select(c => new SupplierListResponse(
                c.Id,
                c.Name,
                c.SupplierCategory.Name,
                c.PhoneNumber,
                c.FaxNumber
                )
            )
            .ToListAsync(token);

        var count = await _context.Suppliers.CountAsync(token);

        return new(suppliers, count);
    }
}