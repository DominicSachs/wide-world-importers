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
        builder.Property(p => p.Name).HasColumnName("CountryName");
    }
}
