namespace ToDo.Domain.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; } = null!;

        /// <summary>
        /// -1 => Failed;
        /// 0 => In progress;
        /// 1 => Done;
        /// </summary>
        public int Status { get; set; } = 0;

        public DateTime? ExpiryDate { get; set; }

        public bool isNotificated { get; set; } = false;

        public int ProfileId { get; set; }

        public Profile Profile { get; set; } = null!;

        public int? FolderId { get; set; }

        public Folder? Folder { get; set; }
    }
}
