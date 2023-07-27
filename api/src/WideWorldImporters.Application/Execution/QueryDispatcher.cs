using Microsoft.Extensions.DependencyInjection;
using WideWorldImporters.Application.Abstractions;

namespace WideWorldImporters.Application.Execution;

public sealed class QueryDispatcher : IQueryDispatcher
{
    private readonly IServiceProvider _serviceProvider;

    public QueryDispatcher(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public Task<TResponse> HandleAsync<TQuery, TResponse>(TQuery query, CancellationToken cancellationToken = default) where TQuery : Query<TResponse>
    {
        var handler = _serviceProvider.GetRequiredService<IQueryHandlerAsync<TQuery, TResponse>>();

        return handler!.HandleAsync(query, cancellationToken);
    }
}