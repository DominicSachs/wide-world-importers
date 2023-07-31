using WideWorldImporters.Domain.Abstractions;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Countries;

internal class CountryListSortStrategy : SortMapStrategy
{
    protected override void InitializeMap()
    {
        _mappings = new()
        {
            { nameof(CountryListResponse.Population), nameof(Country.LatestRecordedPopulation) }
        };
    }
}