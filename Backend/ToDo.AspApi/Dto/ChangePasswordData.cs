using System.ComponentModel.DataAnnotations;

namespace ToDo.AspApi.Dto
{
    [Serializable]
    public class ChangePasswordData
    {
        [Required(ErrorMessage = "Неизвестный пользователь")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Укажите старый пароль!")]
        [MaxLength(30, ErrorMessage = "Пароль слишком длинный!")]
        [MinLength(2, ErrorMessage = "Пароль слишком короткий!")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "Укажите новый пароль!")]
        [MaxLength(30, ErrorMessage = "Пароль слишком длинный!")]
        [MinLength(2, ErrorMessage = "Пароль слишком короткий!")]
        public string NewPassword { get; set; }
    }
}
