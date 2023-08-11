using Microsoft.AspNetCore.Mvc;
using ToDo.DAL.Interfaces;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class TaskController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public TaskController(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
        }

        [HttpGet("")]
        public IActionResult GetAllTasks()
        {
            return Ok(_repository.Tasks.GetAll());
        }
    }
}
