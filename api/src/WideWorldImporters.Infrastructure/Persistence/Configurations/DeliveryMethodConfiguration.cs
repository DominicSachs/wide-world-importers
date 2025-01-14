using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class DeliveryMethodConfiguration : IEntityTypeConfiguration<DeliveryMethod>
{
    public void Configure(EntityTypeBuilder<DeliveryMethod> builder)
    {
        builder.ToTable("DeliveryMethods", EntityConfigurationConstants.ApplicationSchemaName);

        builder.Property(p => p.Id).HasColumnName("DeliveryMethodID");
        builder.Property(p => p.Name).HasColumnName("DeliveryMethodName").IsRequired().HasMaxLength(50);
    }
}
