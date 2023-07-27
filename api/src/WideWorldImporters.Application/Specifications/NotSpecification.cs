using System.Linq.Expressions;

namespace WideWorldImporters.Application.Specifications;

public sealed class NotSpecification<T> : Specification<T>
{
    private readonly Specification<T> _specification;

    public NotSpecification(Specification<T> specification)
    {
        _specification = specification;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        var matchExpression = _specification.ToExpression();
        var binaryExpression = Expression.Not(matchExpression.Body);

        return Expression.Lambda<Func<T, bool>>(binaryExpression, matchExpression.Parameters);
    }
}