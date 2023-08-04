namespace ToDo.Domain.Models
{
    public class Folder
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        
        public int ProfileId { get; set; }
        
        public Profile Profile { get; set; } = null!;
    
        public ICollection<Task> Tasks { get; set; }

        public Folder()
        {
            Tasks = new List<Task>();
        }
    }
}
