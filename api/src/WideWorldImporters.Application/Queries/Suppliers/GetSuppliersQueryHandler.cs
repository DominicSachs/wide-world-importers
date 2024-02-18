using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Extensions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

internal sealed class GetSuppliersQueryHandler : IQueryHandlerAsync<GetSuppliersQuery, PagedResult<SupplierListResponse>>
{
    private readonly IAppDbContext _context;

    public GetSuppliersQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<SupplierListResponse>> HandleAsync(GetSuppliersQuery query, CancellationToken token)
    {
        query.Filter.SetSortStrategy(new SupplierListSortStrategy());
        var sortColumn = string.IsNullOrWhiteSpace(query.Filter.SortColumn) ? nameof(Supplier.Name) : query.Filter.SortColumn;

        var suppliers = await _context.Suppliers.AsNoTracking()
            .OrderBy(sortColumn, query.Filter.SortDirection)
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