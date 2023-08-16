using Bogus;
using Bogus.Extensions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Tests.Fakes;

internal sealed class CustomerFaker : Faker<Customer>
{
    public CustomerFaker()
    {
        var id = 1;

        UseSeed(1234)
            .RuleFor(r => r.Id, f => id++)
            .RuleFor(r => r.Name, f => f.Company.CompanyName().ClampLength(max: 10))
            .RuleFor(r => r.PhoneNumber, f => f.Phone.PhoneNumber().ClampLength(max: 20))
            .RuleFor(r => r.FaxNumber, f => f.Phone.PhoneNumber().ClampLength(max: 20))
            .RuleFor(r => r.PostalAddress, f => new() { AddressLine1 = f.Address.StreetAddress().ClampLength(max: 60), PostalCode = f.Address.ZipCode() })
            .RuleFor(r => r.DeliveryAddress, f => new() { AddressLine1 = f.Address.StreetAddress().ClampLength(max: 60), PostalCode = f.Address.ZipCode() })
            .RuleFor(r => r.PostalCity, f => new() { Name = f.Address.City().ClampLength(max: 50) })
            .RuleFor(r => r.DeliveryCity, f => new() { Name = f.Address.City().ClampLength(max: 50) });
    }
}
