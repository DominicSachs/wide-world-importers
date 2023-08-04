using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class StateProvinceConfiguration : IEntityTypeConfiguration<StateProvince>
{
    public void Configure(EntityTypeBuilder<StateProvince> builder)
    {
        builder.ToTable("StateProvinces", EntityConfigurationConstants.ApplicationSchemaName);

        builder.Property(p => p.Id).HasColumnName("StateProvinceID");
        builder.Property(p => p.Code).HasColumnName("StateProvinceCode").IsRequired();
        builder.Property(p => p.Name).HasColumnName("StateProvinceName").IsRequired();
        builder.Property(p => p.SalesTerritory).IsRequired();
        builder.Property(p => p.Population).HasColumnName("LatestRecordedPopulation");
        builder.Property(p => p.LastEditedById).HasColumnName("LastEditedBy");
    }
}
