using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.CountrySpecifications;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Countries;

internal sealed class GetCountryQueryHandler : IQueryHandlerAsync<GetCountryQuery, CountryEditResponse>
{
    private readonly IAppDbContext _context;

    public GetCountryQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<CountryEditResponse> HandleAsync(GetCountryQuery query, CancellationToken token)
    {
        var expression = new CountryIdSpecification(query.Id).ToExpression();

        return _context.Countries.AsNoTracking()
            .Where(expression)
            .Select(c => new CountryEditResponse(
                c.Id,
                c.Name,
                c.FormalName,
                c.Region,
                c.Subregion,
                c.Continent,
                c.StateProvinces.OrderBy(s => s.Name).Select(s => new StateProvinceModel(s.Id, s.Code, s.Name, s.SalesTerritory, s.Population)).ToList(),
                c.LatestRecordedPopulation
            ))
            .SingleAsync(token);
    }
}