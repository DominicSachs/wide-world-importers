using WideWorldImporters.Application.Abstractions;

namespace WideWorldImporters.Application.Queries.States;

public sealed class GetCountryStateNamesQuery : Query<List<KeyValuePair<int, string>>>
{
    public GetCountryStateNamesQuery(Context context, int countryId) : base(context)
    {
        CountryId = countryId;
    }

    public int CountryId { get; }
}