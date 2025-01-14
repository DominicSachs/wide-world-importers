using Bogus;
using Bogus.Extensions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Tests.Fakes;

internal sealed class SupplierFaker : Faker<Supplier>
{
	private readonly UserFaker _userFaker;

	public SupplierFaker()
	{
		_userFaker = new UserFaker();

		UseSeed(1234)
			.RuleFor(r => r.Id, f => f.IndexFaker + 1)
			.RuleFor(r => r.Name, f => f.Company.CompanyName().ClampLength(max: 100))
			.RuleFor(r => r.PhoneNumber, f => f.Phone.PhoneNumber().ClampLength(max: 20))
			.RuleFor(r => r.FaxNumber, f => f.Phone.PhoneNumber().ClampLength(max: 20))
			.RuleFor(r => r.WebsiteUrl, f => f.Internet.Url())
			.RuleFor(r => r.SupplierCategory, f => new() { Name = f.Commerce.Categories(1)[0] })
			.RuleFor(r => r.LastEditedBy, _ => _userFaker.Generate());
	}
}
