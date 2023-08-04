using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ToDo.Domain.Models;

namespace ToDo.DAL.Configurations
{
    public class TaskConfiguration : IEntityTypeConfiguration<ToDo.Domain.Models.Task>
    {
        public void Configure(EntityTypeBuilder<Domain.Models.Task> builder)
        {
            builder.ToTable("Tasks");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasColumnType("int")
                .UseIdentityColumn()
                .IsRequired();

            builder.Property(x => x.Name)
                .HasColumnName("Name")
                .HasColumnType("text")
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.Description)
                .HasColumnName("Description")
                .HasColumnType("text")
                .HasMaxLength(250);

            builder.Property(x => x.ExpiryDate)
                .HasColumnName("ExpiryDate")
                .HasColumnType("date");

            builder.Property(x => x.isNotificated)
                .HasColumnName("IsNotificated")
                .HasColumnType("boolean");

            builder.HasOne<Profile>(t => t.Profile)
                .WithMany(p => p.Tasks)
                .HasForeignKey(t => t.ProfileId);

            builder.HasOne<Folder>(t => t.Folder)
                .WithMany(f => f.Tasks)
                .HasForeignKey(t => t.FolderId);
        }
    }
}
