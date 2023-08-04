using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.DAL.Configurations
{
    public class ProfileConfiguration : IEntityTypeConfiguration<Profile>
    {
        public void Configure(EntityTypeBuilder<Profile> builder)
        {
            builder.ToTable("Profiles");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasColumnType("int")
                .UseIdentityColumn()
                .IsRequired();

            builder.Property(x => x.Email)
                .HasColumnName("Email")
                .HasColumnType("text")
                .HasMaxLength(50);

            builder.Property(x => x.isEmailNotificationEnabled)
                .HasColumnName("IsEmailNotificationEnabled")
                .HasColumnType("boolean");

            builder.Property(x => x.isEmailVerificated)
                .HasColumnName("IsEmailVerificated")
                .HasColumnType("boolean");

            builder.HasMany<Domain.Models.Task>(p => p.Tasks)
                .WithOne(t => t.Profile)
                .HasForeignKey(t => t.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
