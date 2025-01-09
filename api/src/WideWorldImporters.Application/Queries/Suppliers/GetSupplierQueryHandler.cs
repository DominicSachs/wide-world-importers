using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.SupplierSpecifications;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Suppliers;

internal sealed class GetSupplierQueryHandler : IQueryHandlerAsync<GetSupplierQuery, SupplierEditResponse>
{
    private readonly IAppDbContext _context;

    public GetSupplierQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<SupplierEditResponse> HandleAsync(GetSupplierQuery query, CancellationToken token)
    {
        var expression = new SupplierIdSpecification(query.Id).ToExpression();

        return _context.Suppliers.AsNoTracking()
            .Where(expression)
            .Select(c => new SupplierEditResponse(
                c.Id,
                c.Name,
                c.SupplierCategoryId,
                c.PhoneNumber,
                c.FaxNumber,
                c.WebsiteUrl,
                c.DeliveryMethodId,
                c.Reference,
                c.Comments,
                c.LastEditedBy.FullName
            ))
            .SingleAsync(token);
    }
}