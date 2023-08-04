namespace WideWorldImporters.Domain.Entities;

public sealed class StateProvince : BaseEntity
{
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string SalesTerritory { get; set; } = default!;
    public long? Population { get; set; }
    public int CountryId { get; set; }
    public Country Country { get; set; } = default!;
    public int LastEditedById { get; set; }
}
