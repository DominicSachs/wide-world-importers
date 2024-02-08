using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders", EntityConfigurationConstants.SalesSchemaName);

        builder.Property(p => p.Id).HasColumnName("OrderID");
        builder.Property(p => p.OrderedOn).HasColumnName("OrderDate");
        builder.Property(p => p.ExpectedDeliveryOn).HasColumnName("ExpectedDeliveryDate");
        builder.Property(p => p.LastEditedAt).HasColumnName("LastEditedWhen");
        builder.Property(p => p.LastEditedById).HasColumnName("LastEditedBy");
    }
}
