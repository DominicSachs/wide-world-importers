namespace WideWorldImporters.Application.Abstractions;

public abstract class Query<T>
{
    public Query(Context context)
    {
        Context = context;
    }

    public Context Context { get; }
}