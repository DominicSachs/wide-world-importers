using Microsoft.Extensions.DependencyInjection;
using WideWorldImporters.Application.Abstractions;

namespace WideWorldImporters.Application.Execution;

public sealed class CommandDispatcher : ICommandDispatcher
{
    private readonly IServiceProvider _serviceProvider;

    public CommandDispatcher(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task HandleAsync<TCommand>(TCommand command, CancellationToken cancellationToken) where TCommand : Command
    {
        var handler = _serviceProvider.GetRequiredService<ICommandHandlerAsync<TCommand>>();

        await handler.HandleAsync(command, cancellationToken);
    }

    public async Task<TResult> HandleAsync<TCommand, TResult>(TCommand command, CancellationToken cancellationToken) where TCommand : Command<TResult>
    {
        var handler = _serviceProvider.GetRequiredService<ICommandHandlerAsync<TCommand, TResult>>();

        return await handler.HandleAsync(command, cancellationToken);
    }
}