using System.Diagnostics.CodeAnalysis;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Settings;

namespace WideWorldImporters.Api.Extensions;

[ExcludeFromCodeCoverage]
public static class ServiceCollectionExtensions
{
    public static void AddContext(this IServiceCollection services)
    {
        services.AddScoped(s =>
        {
            var id = 1; // Guid.Parse(principal.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var email = "";

            return new Context(id, email, new string[0]);
        });
    }

    public static void AddAuthenticationAndAuthorization(this IServiceCollection services, JwtSettings jwtSettings)
    {
        services.AddAuthentication()
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.MapInboundClaims = false;
                options.Audience = "https://localhost:5001";
                options.Authority = "https://localhost:5002";
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        services.AddAuthorization();
    }

}