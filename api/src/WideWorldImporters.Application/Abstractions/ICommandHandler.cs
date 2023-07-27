namespace WideWorldImporters.Application.Abstractions;

public interface ICommandHandlerAsync<in TCommand> where TCommand : Command
{
    Task HandleAsync(TCommand command, CancellationToken cancellationToken);
}

public interface ICommandHandlerAsync<in TCommand, TResult> where TCommand : Command<TResult>
{
    Task<TResult> HandleAsync(TCommand command, CancellationToken cancellationToken);
}