using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Extensions;

namespace WideWorldImporters.Application.Queries.Countries;

internal sealed class GetCountryNamesQueryHandler : IQueryHandlerAsync<GetCountryNamesQuery, List<KeyValuePair<int, string>>>
{
    private readonly IAppDbContext _context;

    public GetCountryNamesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<List<KeyValuePair<int, string>>> HandleAsync(GetCountryNamesQuery query, CancellationToken token)
    {
        return _context.Countries.AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => new KeyValuePair<int, string>(c.Id, c.Name))
            .ToListAsync(token);
    }
}