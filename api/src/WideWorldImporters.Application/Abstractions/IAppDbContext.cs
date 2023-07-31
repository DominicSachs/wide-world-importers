using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Abstractions;

public interface IAppDbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Country> Countries { get; set; }

    Task<int> SaveChangesAsync(CancellationToken token);
}
