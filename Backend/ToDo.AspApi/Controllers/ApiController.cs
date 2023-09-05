using Microsoft.AspNetCore.Mvc;
using ToDo.DAL.Interfaces;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ApiController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public ApiController(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
        }

        [HttpGet("Status")]
        public IActionResult ApiStatus()
        {
            if (_repository.DbStatus())
                return Ok();

            return BadRequest();
        }
    }
}
