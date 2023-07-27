namespace WideWorldImporters.Domain.Models;

public sealed class DataFilter
{
    public string? SortColumn { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; } = 10;
    public int SkippedItems => Page * PageSize;
}