using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using ToDo.DAL.Interfaces;
using ToDo.Domain.Models;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IBaseRepository<Profile> _profileRepository;

        public AccountController(ILogger<AccountController> logger, IBaseRepository<User> userRepository, IBaseRepository<Profile> profileRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
            _profileRepository = profileRepository;
        }

        [HttpGet("User/{login}")]
        public ActionResult FindUserByLogin(string login)
        {
            var requestedUser = _userRepository
                                    .ReadAsync()
                                    .ToList()
                                    .FirstOrDefault(x => x.Login.Equals(login), null);

            if (requestedUser == null)
                return BadRequest("User not found");

            return Ok("User is exist");
        }

        [HttpGet("User/{login}&{password}")]
        public ActionResult AuthUser(string login, string password)
        {
            var requestedUser = _userRepository
                                    .ReadAsync()
                                    .ToList()
                                    .FirstOrDefault(x => x.Login.Equals(login),null);

            if (requestedUser == null)
                return BadRequest("User not found");

            if (requestedUser.Password.Equals(password))
                return Ok(requestedUser);

            return BadRequest("Invalid password");
        }

        [HttpPost("CreateUser/{login}&{password}")]
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

        }
    }
}
