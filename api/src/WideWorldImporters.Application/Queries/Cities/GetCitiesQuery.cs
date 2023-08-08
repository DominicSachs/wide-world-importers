using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Cities;

public sealed class GetCitiesQuery : Query<PagedResult<CityListResponse>>
{
    public GetCitiesQuery(Context context, DataFilter filter) : base(context)
    {
        Filter = filter;
    }

    public DataFilter Filter { get; }
}