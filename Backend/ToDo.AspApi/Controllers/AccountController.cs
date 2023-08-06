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
            var requestedUser = _repository
                                    .Users
                                    .ReadByCondition(x => x.Login.Equals(login))
                                    .FirstOrDefault();

            if (requestedUser == null)
                return BadRequest("Пользователь не найден");

            return Ok("Пользователь существует");
        }

        [HttpGet("User/{login}&{password}")]
        public ActionResult AuthUser(string login, string password)
        {
            var requestedUser = _repository
                                    .Users
                                    .ReadByCondition(x => x.Login.Equals(login))
                                    .FirstOrDefault();

            if (requestedUser == null)
                return BadRequest("Пользователь не найден");

            if (requestedUser.Password.Equals(password))
                return Ok(requestedUser);

            return BadRequest("Неверный пароль");
        }

        /*[HttpPost("CreateUser/{login}&{password}")]
        public async Task<ActionResult> RegisterUser(string login, string password)
        {
            bool isLoginBusy = _userRepository.ReadAsync().Any(x => x.Login.Equals(login));

            if (isLoginBusy)
                return BadRequest("Login is busy");

            var newUser = new User() { Login = login, Password = password };
            await _userRepository.CreateAsync(newUser);

            var newProfile = new Profile();
            await _profileRepository.CreateAsync(newProfile);

            newUser.Profile = newProfile;
            await _userRepository.UpdateAsync(newUser);

            return Ok(newUser);

        }*/

        [HttpPost("CreateUser/")]
        public ActionResult RegisterUser([FromForm]CreateUserData createUserData)
        {
            bool isLoginBusy = _repository
                                   .Users
                                   .ReadAll()
                                   .Any(x => x.Login.Equals(createUserData.Login));

            if (isLoginBusy)
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
