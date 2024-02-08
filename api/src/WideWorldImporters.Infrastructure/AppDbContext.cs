using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure;

internal sealed class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Order> Orders { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<StateProvince> StateProvinces { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Owned<Address>();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
