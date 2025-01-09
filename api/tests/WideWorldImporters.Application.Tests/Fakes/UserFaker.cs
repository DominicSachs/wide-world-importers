using Bogus;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Tests.Fakes;

internal sealed class UserFaker : Faker<User>
{
	public UserFaker()
	{
		UseSeed(1234)
			.RuleFor(r => r.Id, f => f.IndexFaker + 1)
			.RuleFor(r => r.FullName, f => f.Person.FullName)
			.RuleFor(r => r.EmailAddress, f => f.Internet.Email())
			.RuleFor(r => r.LogonName, (_, u) => u.EmailAddress);
	}
}
