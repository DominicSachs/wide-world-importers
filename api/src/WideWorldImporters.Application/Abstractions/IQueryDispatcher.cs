namespace WideWorldImporters.Application.Abstractions;

public interface IQueryDispatcher
{
    Task<TResponse> HandleAsync<TQuery, TResponse>(TQuery query, CancellationToken cancellationToken = default) where TQuery : Query<TResponse>;
}