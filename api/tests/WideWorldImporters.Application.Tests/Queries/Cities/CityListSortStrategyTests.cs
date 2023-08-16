using WideWorldImporters.Application.Queries.Cities;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Tests.Queries.Cities;

public sealed class CityListSortStrategyTests
{
    private readonly CityListSortStrategy _testObject;

    public CityListSortStrategyTests()
    {
        _testObject = new();
    }

    [Theory]
    [InlineData(nameof(CityListResponse.Population), nameof(City.LatestRecordedPopulation))]
    [InlineData(nameof(CityListResponse.State), $"{nameof(City.StateProvince)}.{nameof(City.StateProvince.Name)}")]
    [InlineData(nameof(CityListResponse.Country), $"{nameof(City.StateProvince)}.{nameof(City.StateProvince.Country)}.{nameof(City.StateProvince.Country.Name)}")]
    public void Map_Returns_CorrectPropertyNames(string fromProperty, string toProperty)
    {
        _testObject.Map(fromProperty).Should().Be(toProperty);
    }
}