using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class CityConfiguration : IEntityTypeConfiguration<City>
{
    public void Configure(EntityTypeBuilder<City> builder)
    {
        builder.ToTable("Cities", EntityConfigurationConstants.ApplicationSchemaName);

        builder.Property(p => p.Id).HasColumnName("CityID");
        builder.Property(p => p.Name).HasColumnName("CityName").IsRequired();
        builder.Property(p => p.LastEditedById).HasColumnName("LastEditedBy");
    }
}
