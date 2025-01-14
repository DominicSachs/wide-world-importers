using Bogus;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Tests.Fakes;

internal sealed class SupplierCategoryFaker : Faker<SupplierCategory>
{
	public SupplierCategoryFaker()
	{
		UseSeed(2367)
			.RuleFor(r => r.Id, f => f.IndexFaker + 1)
			.RuleFor(r => r.Name, (f, d) => $"Supplier Category {d.Id}");
	}
}
