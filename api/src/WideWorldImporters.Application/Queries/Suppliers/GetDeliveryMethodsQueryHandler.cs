using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.SupplierSpecifications;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

internal sealed class GetDeliveryMethodsQueryHandler : IQueryHandlerAsync<GetDeliveryMethodsQuery, List<KeyValuePair<int, string>>>
{
    private readonly IAppDbContext _context;

    public GetDeliveryMethodsQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<List<KeyValuePair<int, string>>> HandleAsync(GetDeliveryMethodsQuery query, CancellationToken token)
    {
        return _context.DeliveryMethods.AsNoTracking()
            .Select(c => KeyValuePair.Create(c.Id, c.Name))
            .ToListAsync(token);
    }
}