
namespace ToDo.Domain.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Login { get; set; } = null!;

        public string Password { get; set; } = null!;

        public int? ProfileId { get; set; }

        public Profile? Profile { get; set; } = null!;
    }
}
