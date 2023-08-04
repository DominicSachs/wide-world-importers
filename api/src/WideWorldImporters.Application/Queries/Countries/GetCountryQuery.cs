using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Countries;

public sealed class GetCountryQuery : Query<CountryEditResponse>
{
    public GetCountryQuery(Context context, int id) : base(context)
    {
        Id = id;
    }

    public int Id { get; }
}