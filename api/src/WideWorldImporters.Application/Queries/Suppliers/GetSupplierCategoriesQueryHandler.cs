using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.SupplierSpecifications;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

internal sealed class GetSupplierCategoriesQueryHandler : IQueryHandlerAsync<GetSupplierCategoriesQuery, List<KeyValuePair<int, string>>>
{
    private readonly IAppDbContext _context;

    public GetSupplierCategoriesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<List<KeyValuePair<int, string>>> HandleAsync(GetSupplierCategoriesQuery query, CancellationToken token)
    {
        return _context.SupplierCategories.AsNoTracking()
            .Select(c => KeyValuePair.Create(c.Id, c.Name))
            .ToListAsync(token);
    }
}