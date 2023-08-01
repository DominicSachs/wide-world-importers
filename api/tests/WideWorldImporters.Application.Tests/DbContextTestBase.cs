using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Infrastructure;

namespace WideWorldImporters.Application.Tests;

public abstract class DbContextTestBase : IDisposable
{
    internal readonly AppDbContext DbContext;
    private readonly string _databaseName;

    public DbContextTestBase()
    {
        _databaseName = Guid.NewGuid().ToString();
        DbContext = CreateDbContext();
    }

    public void Dispose()
    {
        DbContext?.Dispose();
    }

    internal void SaveChanges(Action<AppDbContext> action)
    {
        using var context = CreateDbContext();
        action(context);
        context.SaveChanges();
    }

    internal async Task SaveChangesAsync(Func<AppDbContext, Task> actionAsync)
    {
        await using var context = CreateDbContext();
        await actionAsync(context);
        await context.SaveChangesAsync();
    }

    private AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(_databaseName)
            .EnableSensitiveDataLogging()
            .EnableDetailedErrors()
            .Options;

        return new(options);
    }
}
