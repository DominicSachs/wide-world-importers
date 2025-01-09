namespace WideWorldImporters.Domain.Models;

public record SupplierEditResponse(
    int Id,
    string Name,
    int CategoryId,
    string Phone,
    string Fax,
    string WebsiteUrl,
    int? DeliveryMethodId,
    string? Reference,
    string? Comments,
    string LastEditor);
