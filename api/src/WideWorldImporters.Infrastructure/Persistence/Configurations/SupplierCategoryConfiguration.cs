using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class SupplierCategoryConfiguration : IEntityTypeConfiguration<SupplierCategory>
{
    public void Configure(EntityTypeBuilder<SupplierCategory> builder)
    {
        builder.ToTable("SupplierCategories", EntityConfigurationConstants.PurchasingSchemaName);

        builder.Property(p => p.Id).HasColumnName("SupplierCategoryID");
        builder.Property(p => p.Name).HasColumnName("SupplierCategoryName").IsRequired();
    }
}
