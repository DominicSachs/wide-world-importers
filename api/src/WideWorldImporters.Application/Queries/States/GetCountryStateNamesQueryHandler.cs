using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.CustomerSpecifications;

namespace WideWorldImporters.Application.Queries.States;

internal sealed class GetCountryStateNamesQueryHandler : IQueryHandlerAsync<GetCountryStateNamesQuery, List<KeyValuePair<int, string>>>
{
    private readonly IAppDbContext _context;

    public GetCountryStateNamesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<List<KeyValuePair<int, string>>> HandleAsync(GetCountryStateNamesQuery query, CancellationToken token)
    {
        var expression = new StateProvinceCountryIdSpecification(query.CountryId).ToExpression();

        return _context.StateProvinces.AsNoTracking()
            .Where(expression)
            .OrderBy(s => s.Name)
            .Select(s => new KeyValuePair<int, string>(s.Id, s.Name))
            .ToListAsync(token);
    }
}