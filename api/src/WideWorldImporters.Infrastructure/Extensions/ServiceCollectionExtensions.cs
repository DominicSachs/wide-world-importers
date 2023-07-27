using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WideWorldImporters.Application.Abstractions;

namespace WideWorldImporters.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddInfrastructureServices(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
        services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());
    }
}