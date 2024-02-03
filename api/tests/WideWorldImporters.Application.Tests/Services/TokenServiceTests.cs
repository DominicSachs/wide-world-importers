using Microsoft.IdentityModel.JsonWebTokens;
using WideWorldImporters.Application.Services;
using WideWorldImporters.Application.Settings;

namespace WideWorldImporters.Application.Tests.Services;

public sealed class TokenServiceTests
{
    private readonly TokenService _sut;

    public TokenServiceTests()
    {
        var settings = new JwtSettings { Issuer = "issuer", Audience = "audience", Secret = "secret-secret-secret-secret-secret", ExpiresInMinutes = 10 };

        _sut = new(settings);
    }

    [Fact]
    public void Gets_Correct_Token()
    {
        var result = _sut.GetToken(1, "test@example.com");

        var tokenHandler = new JsonWebTokenHandler();
        var token = tokenHandler.ReadJsonWebToken(result);

        token.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Sub).Value.Should().Be("1");
        token.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Email).Value.Should().Be("test@example.com");
    }
}