using System.ComponentModel;
using System.Linq.Expressions;

namespace WideWorldImporters.Application.Extensions;

public static class QueryableExtensions
{
    public static IQueryable<T> OrderBy<T>(this IQueryable<T> query, string propertyName, ListSortDirection direction)
    {
        var methodName = direction == ListSortDirection.Descending ? "OrderByDescending" : "OrderBy";
        var parameter = Expression.Parameter(typeof(T), "p");
        var body = propertyName.Split('.').Aggregate((Expression)parameter, Expression.PropertyOrField);

        return CreateQuery(query, methodName, body, parameter);
    }

    private static IQueryable<T> CreateQuery<T>(IQueryable<T> q, string methodName, Expression body, ParameterExpression parameter)
    {
        var expression = Expression.Lambda(body, parameter);
        var types = new[] { q.ElementType, expression.Body.Type };
        var mce = Expression.Call(typeof(Queryable), methodName, types, q.Expression, expression);

        return q.Provider.CreateQuery<T>(mce);
    }
}