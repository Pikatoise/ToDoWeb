using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.DAL.Configurations
{
    public class FolderConfiguration : IEntityTypeConfiguration<Folder>
    {
        public void Configure(EntityTypeBuilder<Folder> builder)
        {
            builder.ToTable("Folders");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasColumnType("int")
                .UseIdentityColumn()
                .IsRequired();

            builder.Property(x => x.Name)
                .HasColumnName("Name")
                .HasColumnType("text")
                .HasMaxLength(20)
                .IsRequired();

            builder.HasOne<Profile>(f => f.Profile)
                .WithMany(p => p.Folders)
                .HasForeignKey(p => p.ProfileId);

            builder.HasMany<Domain.Models.Task>(f => f.Tasks)
                .WithOne(t => t.Folder)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
