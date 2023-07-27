namespace WideWorldImporters.Domain.Models;

public record CustomerEditRequest(int Id, string Name, string Phone, string Fax, AddressModel PostalAddress, AddressModel DeliveryAddress);
