using WideWorldImporters.Application.Queries.Countries;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Tests.Queries.Countries;

public sealed class CountryListSortStrategyTests
{
    private readonly CountryListSortStrategy _testObject;

    public CountryListSortStrategyTests()
    {
        _testObject = new();
    }

    [Theory]
    [InlineData(nameof(CountryListResponse.Population), nameof(Country.LatestRecordedPopulation))]
    public void Map_Returns_CorrectPropertyNames(string fromProperty, string toProperty)
    {
        _testObject.Map(fromProperty).Should().Be(toProperty);
    }
}