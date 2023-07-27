using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.DependencyInjection;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Execution;

namespace WideWorldImporters.Application.Extensions;

[ExcludeFromCodeCoverage]
public static class ServiceCollectionExtensions
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.Scan(
            a => a.FromAssemblyOf<IQueryDispatcher>()
                .AddClasses(c => c.AssignableTo(typeof(IQueryHandlerAsync<,>))).AsImplementedInterfaces().WithScopedLifetime()
                .AddClasses(c => c.AssignableTo(typeof(ICommandHandlerAsync<>))).AsImplementedInterfaces().WithScopedLifetime()
                .AddClasses(c => c.AssignableTo(typeof(ICommandHandlerAsync<,>))).AsImplementedInterfaces().WithScopedLifetime()
        );

        services.AddScoped<IQueryDispatcher, QueryDispatcher>();
        services.AddScoped<ICommandDispatcher, CommandDispatcher>();
    }
}