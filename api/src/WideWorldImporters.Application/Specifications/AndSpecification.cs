using System.Linq.Expressions;

namespace WideWorldImporters.Application.Specifications;

public sealed class AndSpecification<T> : Specification<T>
{
    private readonly Specification<T> _left;
    private readonly Specification<T> _right;

    public AndSpecification(Specification<T> left, Specification<T> right)
    {
        _right = right ?? throw new ArgumentNullException(nameof(right));
        _left = left ?? throw new ArgumentNullException(nameof(left));
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        var left = _left.ToExpression();
        var right = _right.ToExpression();

        if (left == null)
        {
            throw new ArgumentNullException(nameof(left));
        }

        if (right == null)
        {
            throw new ArgumentNullException(nameof(right));
        }

        var visitor = new SwapVisitor(left.Parameters[0], right.Parameters[0]);
        var binaryExpression = Expression.AndAlso(visitor.Visit(left.Body)!, right.Body);

        return Expression.Lambda<Func<T, bool>>(binaryExpression, right.Parameters);
    }
}