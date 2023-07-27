using WideWorldImporters.Domain.Entities.Enums;

namespace WideWorldImporters.Domain.Entities;

public sealed class Customer : BaseEntity
{
    public string Name { get; set; } = default!;
    public DeliveryMethod DeliveryMethod { get; set; }
    public string PhoneNumber { get; set; } = default!;
    public string FaxNumber { get; set; } = default!;
    public Address PostalAddress { get; set; } = default!;
    public Address DeliveryAddress { get; set; } = default!;
    public int PostalCityId { get; set; }
    public City PostalCity { get; set; } = default!;
    public int DeliveryCityId { get; set; }
    public City DeliveryCity { get; set; } = default!;
}
