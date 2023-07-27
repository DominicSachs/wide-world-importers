namespace WideWorldImporters.Domain.Models;


public record PagedResult<T>(IEnumerable<T> Items, int Count) where T : class;