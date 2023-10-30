namespace ToDo.Domain.Models
{
    public class Profile
    {
        public int Id { get; set; }

        public string? Email { get; set; } = null!;

        public bool isEmailVerificated { get; set; } = false;

        public bool isEmailNotificationEnabled { get; set; } = false;

        public User? User { get; set; } = null!;

        public ICollection<Task> Tasks { get; set; }

        public ICollection<Folder> Folders { get; set; }

        public Profile()
        {
            Tasks = new List<Task>();
            Folders = new List<Folder>();
        }
    }
}
