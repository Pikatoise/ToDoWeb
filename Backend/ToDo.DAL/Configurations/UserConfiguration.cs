using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.DAL.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(t => t.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasColumnType("int")
                .UseIdentityColumn()
                .IsRequired();

            builder.Property(x => x.Login)
                .HasColumnName("Login")
                .HasColumnType("text")
                .HasMaxLength(30)
                .IsRequired();

            builder.Property(x => x.Password)
                .HasColumnName("Password")
                .HasColumnType("text")
                .HasMaxLength(30)
                .IsRequired();

            builder.HasOne<Profile>(u => u.Profile)
                .WithOne(p => p.User)
                .HasForeignKey<User>(u => u.ProfileId);
        }
    }
}
