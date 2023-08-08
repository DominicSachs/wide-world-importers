using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.CountrySpecifications;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Cities;

internal sealed class GetCityQueryHandler : IQueryHandlerAsync<GetCityQuery, CityEditResponse>
{
    private readonly IAppDbContext _context;

    public GetCityQueryHandler(IAppDbContext context)
    {
        _context = context;
    }

    public Task<CityEditResponse> HandleAsync(GetCityQuery query, CancellationToken token)
    {
        var expression = new CityIdSpecification(query.Id).ToExpression();

        return _context.Cities.AsNoTracking()
            .Where(expression)
            .Select(c => new CityEditResponse(
                c.Id,
                c.Name,
                c.StateProvince.CountryId,
                c.StateProvinceId,
                c.LatestRecordedPopulation
                )
            )
            .SingleAsync(token);
    }
}