using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Settings;

namespace WideWorldImporters.Application.Services;

public sealed class TokenService : ITokenService
{
    private readonly JwtSettings _jwtSettings;

    public TokenService(JwtSettings jwtSettings)
    {
        _jwtSettings = jwtSettings;
    }

    public string GetToken(int userId, string emailAddress)
    {
        var identity = new ClaimsIdentity([new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()), new Claim(JwtRegisteredClaimNames.Email, emailAddress)]);
        var tokenHandler = new JsonWebTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtSettings.Secret);

        var descriptor = new SecurityTokenDescriptor
        {
            Subject = identity,
            Audience = "http://localhost:5001",
            Issuer = "https://localhost:5002",
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
            Expires = DateTime.UtcNow.AddHours(8),
        };

        return tokenHandler.CreateToken(descriptor);
    }
}