using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Countries;

public sealed class GetCountriesQuery : Query<PagedResult<CountryListResponse>>
{
    public GetCountriesQuery(Context context, DataFilter filter) : base(context)
    {
        Filter = filter;
    }

    public DataFilter Filter { get; }
}