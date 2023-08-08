using WideWorldImporters.Domain.Abstractions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Cities;

internal sealed class CityListSortStrategy : SortMapStrategy
{
    protected override void InitializeMap()
    {
        _mappings = new()
        {
            { nameof(CityListResponse.Population), nameof(City.LatestRecordedPopulation) },
            { nameof(CityListResponse.State), $"{nameof(City.StateProvince)}.{nameof(City.StateProvince.Name)}" },
            { nameof(CityListResponse.Country), $"{nameof(City.StateProvince)}.{nameof(City.StateProvince.Country)}.{nameof(City.StateProvince.Country.Name)}" }
        };
    }
}