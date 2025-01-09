using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Domain.Entities;
using DeliveryMethod = WideWorldImporters.Domain.Entities.DeliveryMethod;

namespace WideWorldImporters.Application.Abstractions;

public interface IAppDbContext
{
    public DbSet<Order> Orders { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<SupplierCategory> SupplierCategories { get; set; }
    public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<StateProvince> StateProvinces { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<User> Users { get; set; }

    Task<int> SaveChangesAsync(CancellationToken token);
}
