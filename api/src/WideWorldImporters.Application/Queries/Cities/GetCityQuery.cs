using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Cities;

public sealed class GetCityQuery : Query<CityEditResponse>
{
    public GetCityQuery(Context context, int id) : base(context)
    {
        Id = id;
    }

    public int Id { get; }
}