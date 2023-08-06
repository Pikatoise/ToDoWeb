using ToDo.AspApi.Dto;
using ToDo.Domain.Models;

namespace ToDo.AspApi.Mappers
{
    public static class UserMapper
    {
        public static User ToDomain(CreateUserData createUserData) => 
            new User()
            {
                Login = createUserData.Login,
                Password = createUserData.Password,
            };
    }
}
