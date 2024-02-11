using System.ComponentModel;
using WideWorldImporters.Domain.Abstractions;

namespace WideWorldImporters.Domain.Models;

public sealed class DataFilter
{
    public DataFilter() { }

    public DataFilter(int page, int pageSize, string? sortColumn, ListSortDirection sortDirection, string? searchTerm)
    {
        Page = page;
        PageSize = pageSize;
        SortColumn = sortColumn;
        SortDirection = sortDirection;
        SearchTerm = searchTerm;
    }

    private SortMapStrategy? _strategy;
    private string _sortColumn = default!;

    public string? SortColumn
    {
        get => _strategy == null ? _sortColumn : _strategy.Map(_sortColumn);
        set => _sortColumn = value;
    }
    public ListSortDirection SortDirection { get; init; }
    public int Page { get; init; }
    public int PageSize { get; init; } = 10;
    public int SkippedItems => Page * PageSize;

    public string? SearchTerm { get; init; }

    public void SetSortStrategy(SortMapStrategy strategy)
    {
        _strategy = strategy;
    }
}