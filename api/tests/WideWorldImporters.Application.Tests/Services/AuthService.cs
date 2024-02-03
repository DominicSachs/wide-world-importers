using Bogus;
using NSubstitute;
using WideWorldImporters.Application.Tests;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Abstractions;

public sealed class AuthServiceTests : DbContextTestBase
{
    private readonly ITokenService _tokenService;
    private readonly AuthService _sut;

    public AuthServiceTests()
    {
        _tokenService = Substitute.For<ITokenService>();

        _sut = new(DbContext, _tokenService);
    }

    [Fact]
    public async Task LoginAsync_Returns_Token()
    {
        var user = GetUser(true);
        SaveChanges(context => context.Users.Add(user));

        _tokenService.GetToken(user.Id, user.EmailAddress).Returns("token");

        var result = await _sut.LoginAsync(new(user.LogonName), CancellationToken.None);

        result.Should().Be("token");
    }

    [Theory]
    [InlineData(1, true, "token")]
    [InlineData(1, false, null)]
    public async Task LoginAsync_Returns_Expected(int id, bool isPermittedToLogon, string? expected)
    {
        var user = GetUser(isPermittedToLogon);
        SaveChanges(context => context.Users.Add(user));

        _tokenService.GetToken(user.Id, user.EmailAddress).Returns("token");

        var result = await _sut.LoginAsync(new(user.LogonName), CancellationToken.None);

        result.Should().Be(expected);
    }

    private User GetUser(bool isPermittedToLogon)
    {
        return new Faker<User>()
            .RuleFor(r => r.Id, _ => 1)
            .RuleFor(r => r.FullName, f => f.Person.FullName)
            .RuleFor(r => r.EmailAddress, f => f.Internet.Email())
            .RuleFor(r => r.LogonName, f => f.Internet.Email())
            .RuleFor(r => r.IsPermittedToLogon, _ => isPermittedToLogon)
            .Generate();

    }
}
