using WideWorldImporters.Application.Abstractions;

namespace WideWorldImporters.Application.Queries.Countries;

public sealed class GetCountryNamesQuery : Query<List<KeyValuePair<int, string>>>
{
    public GetCountryNamesQuery(Context context) : base(context) { }
}