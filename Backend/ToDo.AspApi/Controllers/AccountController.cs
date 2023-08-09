using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using ToDo.AspApi.Dto;
using ToDo.AspApi.Mappers;
using ToDo.DAL.Interfaces;
using ToDo.DAL.Repositories;
using ToDo.Domain.Models;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IRepositoryWrapper _repository;

        public AccountController(ILogger<AccountController> logger, IRepositoryWrapper repositoryWrapper)
        {
            _logger = logger;
            _repository = repositoryWrapper;
        }

        [HttpGet("User/{login}")]
        public ActionResult FindUserByLogin(string login)
        {
            var requestedUser = _repository.Users.GetByLogin(login);

            if (requestedUser == null)
                return BadRequest("Пользователь не найден");

            return Ok("Пользователь существует");
        }

        [HttpGet("User/{login}&{password}")]
        public ActionResult AuthUser(string login, string password)
        {
            var requestedUser = _repository.Users.GetByLogin(login);

            if (requestedUser == null)
                return BadRequest("Пользователь не найден");

            if (requestedUser.Password.Equals(password))
                return Ok(requestedUser);

            return BadRequest("Неверный пароль");
        }

        [HttpPost("CreateUser/")]
        public ActionResult RegisterUser([FromForm]CreateUserData createUserData)
        {
            User? sameLoginUser = _repository
                                   .Users
                                   .GetByLogin(createUserData.Login);

            if (sameLoginUser != null)
                return BadRequest("Логин занят");

            var newUser = UserMapper.ToDomain(createUserData);
            _repository.Users.Create(newUser);

            var newProfile = new Profile();
            _repository.Profiles.Create(newProfile);

            _repository.Save();

            newUser.Profile = newProfile;
            _repository.Users.Update(newUser);

            _repository.Save();

            return Ok(newUser);

        }
    }
}
