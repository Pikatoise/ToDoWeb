using Microsoft.EntityFrameworkCore;
using ToDo.DAL.Configurations;

namespace ToDo.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
            //Database.EnsureDeleted();

            Database.EnsureCreated();
        }

        public DbSet<Domain.Models.User> Users { get; set; }
        public DbSet<Domain.Models.Profile> Profiles { get; set; }
        public DbSet<Domain.Models.Task> Tasks { get; set; }
        public DbSet<Domain.Models.Folder> Folders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new ProfileConfiguration());
            modelBuilder.ApplyConfiguration(new TaskConfiguration());
            modelBuilder.ApplyConfiguration(new FolderConfiguration());
        }
    }
}
