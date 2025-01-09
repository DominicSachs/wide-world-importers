namespace WideWorldImporters.Domain.Entities;

public sealed class Supplier : BaseEntity
{
    public string Name { get; set; } = default!;
    public string? Reference { get; set; }
    public string PhoneNumber { get; set; } = default!;
    public string FaxNumber { get; set; } = default!;
    public string WebsiteUrl { get; set; } = default!;
    public int SupplierCategoryId { get; set; }
    public int? DeliveryMethodId { get; set; }
    public SupplierCategory SupplierCategory { get; set; } = default!;
    public Address PostalAddress { get; set; } = default!;
    public Address DeliveryAddress { get; set; } = default!;
    public int PostalCityId { get; set; }
    public City PostalCity { get; set; } = default!;
    public int DeliveryCityId { get; set; }
    public City DeliveryCity { get; set; } = default!;
    public string? Comments { get; set; }
    public int LastEditedById { get; set; }
    public User LastEditedBy { get; set; } = default!;
}
