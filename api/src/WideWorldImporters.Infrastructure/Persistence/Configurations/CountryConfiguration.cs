using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Infrastructure.Persistence.Configurations;

internal sealed class CountryConfiguration : IEntityTypeConfiguration<Country>
{
    public void Configure(EntityTypeBuilder<Country> builder)
    {
        builder.ToTable("Countries", EntityConfigurationConstants.ApplicationSchemaName);

        builder.Property(p => p.Id).HasColumnName("CountryID");
        builder.Property(p => p.Name).HasColumnName("CountryName").IsRequired();
        builder.Property(p => p.FormalName).IsRequired();
        builder.Property(p => p.Region).IsRequired();
        builder.Property(p => p.Subregion).IsRequired();
        builder.Property(p => p.Continent).IsRequired();
        builder.Property(p => p.LastEditedById).HasColumnName("LastEditedBy");
    }
}
