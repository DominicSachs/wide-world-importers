namespace WideWorldImporters.Domain.Models;

public record CustomerEditResponse(int Id, string Name, string Phone, string Fax, AddressModel PostalAddress, AddressModel DeliveryAddress);
