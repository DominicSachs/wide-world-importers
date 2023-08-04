namespace WideWorldImporters.Domain.Entities;

public sealed class Country : BaseEntity
{
    public string Name { get; set; } = default!;
    public string FormalName { get; set; } = default!;
    public string Subregion { get; set; } = default!;
    public string Region { get; set; } = default!;
    public string Continent { get; set; } = default!;
    public long? LatestRecordedPopulation { get; set; }
    public int LastEditedById { get; set; }
    public List<StateProvince> StateProvinces { get; set; } = default!;
}
