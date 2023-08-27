using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Extensions;
using WideWorldImporters.Application.Specifications.CountrySpecifications;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Cities;

internal sealed class GetCitiesQueryHandler : IQueryHandlerAsync<GetCitiesQuery, PagedResult<CityListResponse>>
{
    private readonly IAppDbContext _context;

    public GetCitiesQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<CityListResponse>> HandleAsync(GetCitiesQuery query, CancellationToken token)
    {
        query.Filter.SetSortStrategy(new CityListSortStrategy());
        var sortColumn = query.Filter.SortColumn ?? nameof(City.Name);
        var expression = new CitySearchSpecification(query.Filter.SearchTerm!).ToExpression();

        var cities = await _context.Cities.AsNoTracking()
            .Where(expression)
            .OrderBy(sortColumn, query.Filter.SortDirection)
            .Skip(query.Filter.SkippedItems)
            .Take(query.Filter.PageSize)
            .Select(c => new CityListResponse(
                c.Id,
                c.Name,
                c.StateProvince.Name,
                c.StateProvince.Country.Name,
                c.LatestRecordedPopulation)
            )
            .ToListAsync(token);

        var count = await _context.Cities.CountAsync(expression, token);

        return new(cities, count);
    }
}