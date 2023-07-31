using System.ComponentModel;
using WideWorldImporters.Domain.Abstractions;

namespace WideWorldImporters.Domain.Models;

public sealed class DataFilter
{
    private SortMapStrategy? _strategy;
    private string _sortColumn = default!;

    public string SortColumn
    {
        get => _strategy == null ? _sortColumn : _strategy.Map(_sortColumn);
        set => _sortColumn = value;
    }

    public ListSortDirection SortDirection { get; set; }

    public int Page { get; set; }
    public int PageSize { get; set; } = 10;
    public int SkippedItems => Page * PageSize;

    public void SetSortStrategy(SortMapStrategy strategy)
    {
        _strategy = strategy;
    }
}