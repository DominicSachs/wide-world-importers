using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable("Customers", EntityConfigurationConstants.SalesSchemaName);

        builder.Property(p => p.Id).HasColumnName("CustomerID");
        builder.Property(p => p.Name).HasColumnName("CustomerName");
        builder.Property(p => p.DeliveryMethod).HasColumnName("DeliveryMethodID");
        builder.Property(p => p.PhoneNumber).IsRequired().HasMaxLength(20);
        builder.Property(p => p.FaxNumber).IsRequired().HasMaxLength(20);

        builder.OwnsOne(a => a.PostalAddress, address =>
        {
            address.Property(p => p.AddressLine1).HasColumnName("PostalAddressLine1");
            address.Property(p => p.AddressLine2).HasColumnName("PostalAddressLine2");
            address.Property(p => p.PostalCode).HasColumnName("PostalPostalCode");
        });

        builder.OwnsOne(a => a.DeliveryAddress, address =>
        {
            address.Property(p => p.AddressLine1).HasColumnName("DeliveryAddressLine1");
            address.Property(p => p.AddressLine2).HasColumnName("DeliveryAddressLine2");
            address.Property(p => p.PostalCode).HasColumnName("DeliveryPostalCode");
        });
    }
}
