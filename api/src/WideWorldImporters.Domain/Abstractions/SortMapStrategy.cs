using WideWorldImporters.Domain.Extensions;

namespace WideWorldImporters.Domain.Abstractions;

public abstract class SortMapStrategy
{
    protected Dictionary<string, string> _mappings = default!;

    public SortMapStrategy()
    {
        InitializeMap();
    }

    protected abstract void InitializeMap();

    public string? Map(string? propertyName)
    {
        return !string.IsNullOrWhiteSpace(propertyName) && _mappings.TryGetValue(propertyName.FirstCharToUpper()!, out var value) ? value : propertyName;
    }
}