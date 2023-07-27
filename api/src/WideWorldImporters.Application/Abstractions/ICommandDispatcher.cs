namespace WideWorldImporters.Application.Abstractions;

public interface ICommandDispatcher
{
    Task HandleAsync<TCommand>(TCommand command, CancellationToken cancellationToken = default) where TCommand : Command;
    Task<TResult> HandleAsync<TCommand, TResult>(TCommand command, CancellationToken cancellationToken = default) where TCommand : Command<TResult>;
}