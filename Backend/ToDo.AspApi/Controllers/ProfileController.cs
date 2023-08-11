using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using ToDo.DAL.Interfaces;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public ProfileController(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
        }

        [HttpGet("")]
        public IActionResult GetAllProfiles()
        {
            return Ok(_repository.Profiles.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetProfileById(int id)
        {
            var requestedProfile = _repository.Profiles.GetById(id);

            if (requestedProfile == null)
                return NotFound("Профиль не найден");

            return Ok(requestedProfile);
        }

        [HttpPut("id={id}&email={email}")]
        public IActionResult ChangeEmail(int id, string email)
        {
            if (!new EmailAddressAttribute().IsValid(email))
                return BadRequest("Некорректный email");

            var profile = _repository.Profiles.GetById(id);

            if (profile == null)
                return NotFound("Профиль не найден");

            if (profile.Email != null && profile.Email.Equals(email))
                return BadRequest("Email идентичен");

            profile.Email = email;
            profile.isEmailVerificated = false;
            _repository.Profiles.Update(profile);
            _repository.Save();

            return Ok("Email изменен");
        }

        [HttpPut("Verify/{id}")]
        public IActionResult VerifyProfileEmail(int id)
        {
            var profile = _repository.Profiles.GetById(id);

            if (profile == null)
                return NotFound("Профиль не найден");

            profile.isEmailVerificated = true;
            _repository.Profiles.Update(profile);
            _repository.Save();

            return Ok("Email подтвержден");
        }

        [HttpPut("SwitchNotify/{id}")]
        public IActionResult SwitchEmailNotify(int id)
        {
            var profile = _repository.Profiles.GetById(id);

            if (profile == null)
                return NotFound("Профиль не найден");

            if (profile.Email == null)
                return NotFound("Отсутствует email");

            if (!profile.isEmailVerificated)
                return BadRequest("Подтвердите email");

            profile.isEmailNotificationEnabled = !profile.isEmailNotificationEnabled;
            _repository.Profiles.Update(profile);
            _repository.Save();

            return Ok(profile.isEmailNotificationEnabled);
        }
    }
}
