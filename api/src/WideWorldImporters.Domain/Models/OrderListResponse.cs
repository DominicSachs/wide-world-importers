namespace WideWorldImporters.Domain.Models;

public record OrderListResponse(
    int Id,
    string CustomerPurchaseOrderNumber,
    DateOnly OrderedOn,
    DateOnly ExpectedDeliveryOn,
    string CustomerName,
    string ContactName,
    string LastEditedByName,
    DateTime LastEditedAt
);
