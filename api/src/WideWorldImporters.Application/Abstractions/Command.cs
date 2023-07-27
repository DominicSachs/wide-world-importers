namespace WideWorldImporters.Application.Abstractions;

public abstract class Command
{
    public Command(Context context)
    {
        Context = context;
    }

    public Context Context { get; }
}

public abstract class Command<T> : Command
{
    public Command(Context context) : base(context) { }
}