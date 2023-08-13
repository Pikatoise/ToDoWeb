using System.ComponentModel.DataAnnotations;

namespace ToDo.AspApi.Dto
{
    [Serializable]
    public class CreateTaskData
    {
        [Required(ErrorMessage = "Название является обязательным полем")]
        [MaxLength(20, ErrorMessage = "Логин слишком длинный")]
        [MinLength(1, ErrorMessage = "Логин слишком короткий")]
        public string Name { get; set; }

        [MaxLength(500, ErrorMessage = "Описание слишком длинное")]
        public string? Description { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public int ProfileId { get; set; }

        public int? FolderId { get; set; }
    }
}
