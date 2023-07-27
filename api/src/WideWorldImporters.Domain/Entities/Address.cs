namespace WideWorldImporters.Domain.Entities;

public sealed class Address
{
    public string AddressLine1 { get; set; } = default!;
    public string? AddressLine2 { get; set; }
    public string PostalCode { get; set; } = default!;
}
