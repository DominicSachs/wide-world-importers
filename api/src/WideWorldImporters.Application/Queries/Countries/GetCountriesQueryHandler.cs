using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Extensions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Countries;

internal sealed class GetCountriesQueryHandler : IQueryHandlerAsync<GetCountriesQuery, PagedResult<CountryListResponse>>
{
    private readonly IAppDbContext _context;

    public GetCountriesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<CountryListResponse>> HandleAsync(GetCountriesQuery query, CancellationToken token)
    {
        query.Filter.SetSortStrategy(new CountryListSortStrategy());
        var sortColumn = query.Filter.SortColumn ?? nameof(Country.Name);

        var countries = await _context.Countries.AsNoTracking()
            .OrderBy(sortColumn, query.Filter.SortDirection)
            .Skip(query.Filter.SkippedItems)
            .Take(query.Filter.PageSize)
            .Select(c => new CountryListResponse(
                c.Id,
                c.Name,
                c.FormalName,
                c.Region,
                c.Subregion,
                c.Continent,
                c.StateProvinces.Count(),
                c.LatestRecordedPopulation
                )
            )
            .ToListAsync(token);

        var count = await _context.Countries.CountAsync(token);

        return new(countries, count);
    }
}