using Microsoft.AspNetCore.Mvc;
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
                return BadRequest("Профиль не найден");

            return Ok(requestedProfile);
        }
    }
}
