using Microsoft.AspNetCore.Mvc;
using ToDo.AspApi.Dto;
using ToDo.AspApi.Mappers;
using ToDo.DAL.Interfaces;
using ToDo.Domain.Models;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public AccountController(ILogger<AccountController> logger, IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
        }

        [HttpGet("")]
        public ActionResult GetAllUser()
        {
            return Ok(_repository.Users.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult GetUserById(int id)
        {
            var requestedUser = _repository.Users.GetById(id);

            if (requestedUser == null)
                return NotFound("Пользователь не найден");

            return Ok(requestedUser);
        }

        [HttpGet("{login}&{password}")]
        public ActionResult AuthUser(string login, string password)
        {
            var requestedUser = _repository.Users.GetByLogin(login);

            if (requestedUser == null)
                return NotFound("Пользователь не найден");

            if (requestedUser.Password.Equals(password))
                return Ok(requestedUser);

            return BadRequest("Неверный пароль");
        }

        [HttpPost("Create")]
        public ActionResult RegisterUser([FromBody]CreateUserData createUserData)
        {
            User? sameLoginUser = _repository.Users.GetByLogin(createUserData.Login);

            if (sameLoginUser != null)
                return Conflict("Логин занят");

            var newUser = UserMapper.ToDomain(createUserData);
            _repository.Users.Create(newUser);

            var newProfile = new Profile();
            _repository.Profiles.Create(newProfile);

            _repository.Save();

            newUser.Profile = newProfile;
            _repository.Users.Update(newUser);

            _repository.Save();

            return Ok();
        }

        [HttpPut("ChangePassword")]
        public ActionResult ChangePassword([FromBody]ChangePasswordData changePasswordData)
        {
            User? user = _repository.Users.GetById(changePasswordData.UserId);

            if (user == null)
                return NotFound("Пользователь не найден");

            if (!user.Password.Equals(changePasswordData.OldPassword))
                return BadRequest("Неверный пароль");

            user.Password = changePasswordData.NewPassword;

            _repository.Users.Update(user);

            _repository.Save();

            return Ok("Пароль успешно изменен");
        }
    }
}
