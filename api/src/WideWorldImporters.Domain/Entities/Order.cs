namespace WideWorldImporters.Domain.Entities;

public sealed class Order : BaseEntity
{
    public string CustomerPurchaseOrderNumber { get; set; } = default!;
    public DateOnly OrderedOn { get; set; }
    public DateOnly ExpectedDeliveryOn { get; set; }
    public DateTime LastEditedAt { get; set; }
    public int LastEditedById { get; set; }
    public User LastEditedBy { get; set; } = default!;
    public int ContactPersonId { get; set; }
    public User ContactPerson { get; set; } = default!;
    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = default!;
}
