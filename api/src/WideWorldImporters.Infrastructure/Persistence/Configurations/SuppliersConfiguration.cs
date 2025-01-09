using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class SuppliersConfiguration : IEntityTypeConfiguration<Supplier>
{
    public void Configure(EntityTypeBuilder<Supplier> builder)
    {
        builder.ToTable("Suppliers", EntityConfigurationConstants.PurchasingSchemaName);

        builder.Property(p => p.Id).HasColumnName("SupplierID");
        builder.Property(p => p.Name).HasColumnName("SupplierName").IsRequired();
        builder.Property(p => p.Reference).HasColumnName("SupplierReference");
        builder.Property(p => p.WebsiteUrl).HasColumnName("WebsiteURL");
        builder.Property(p => p.PhoneNumber).IsRequired().HasMaxLength(20);
        builder.Property(p => p.FaxNumber).IsRequired().HasMaxLength(20);
        builder.Property(p => p.Comments).HasColumnName("InternalComments");
        builder.Property(p => p.LastEditedById).HasColumnName("LastEditedBy");

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
