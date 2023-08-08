namespace WideWorldImporters.Domain.Entities;

public sealed class City : BaseEntity
{
    public string Name { get; set; } = default!;
    public long? LatestRecordedPopulation { get; set; }
    public int StateProvinceId { get; set; }
    public int LastEditedById { get; set; }
    public StateProvince StateProvince { get; set; } = default!;
}
