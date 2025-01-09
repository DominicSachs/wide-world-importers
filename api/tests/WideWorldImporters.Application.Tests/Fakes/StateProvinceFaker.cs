using Bogus;
using Bogus.Extensions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Tests.Fakes;

internal sealed class StateProvinceFaker : Faker<StateProvince>
{
	public StateProvinceFaker()
	{
		UseSeed(2367)
			.RuleFor(r => r.Id, f => f.IndexFaker + 1)
			.RuleFor(r => r.Name, f => f.Address.State().ClampLength(max: 50))
			.RuleFor(r => r.Code, f => f.Address.StateAbbr().ClampLength(max: 10))
			.RuleFor(r => r.SalesTerritory, f => f.Address.Direction())
			.RuleFor(r => r.CountryId, (f, s) => s.Id % 2 == 0 ? 1 : 2);
	}
}
