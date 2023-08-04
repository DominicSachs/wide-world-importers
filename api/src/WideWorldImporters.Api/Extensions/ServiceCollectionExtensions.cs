using System.Diagnostics.CodeAnalysis;
using WideWorldImporters.Application.Abstractions;

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
}