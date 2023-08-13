using System.ComponentModel.DataAnnotations;

namespace ToDo.AspApi.Dto
{
    public class ChangeTaskData
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Название является обязательным полем")]
        public string Name { get; set; } = null!;

        [MaxLength(500, ErrorMessage = "Описание слишком длинное")]
        public string? Description { get; set; }

        public int Status { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public int? FolderId { get; set; }
    }
}
