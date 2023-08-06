using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ToDo.AspApi.Dto
{
    [Serializable]
    public class CreateUserData
    {
        [Required(ErrorMessage = "Укажите логин!")]
        [MaxLength(30, ErrorMessage = "Логин слишком длинный!")]
        [MinLength(2, ErrorMessage = "Логин слишком короткий!")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Укажите пароль!")]
        [MaxLength(30, ErrorMessage = "Пароль слишком длинный!")]
        [MinLength(2, ErrorMessage = "Пароль слишком короткий!")]
        public string Password { get; set; }
    }
}
