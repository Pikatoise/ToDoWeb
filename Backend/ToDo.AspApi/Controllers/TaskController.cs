using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ToDo.AspApi.Dto;
using ToDo.AspApi.Mappers;
using ToDo.DAL.Interfaces;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpGet("{id}")]
        public IActionResult GetTaskById(int id)
        {
            var task = _repository.Tasks.GetById(id);

            if (task == null)
                return NotFound("Задача не найдена");

            return Ok(task);
        }

        [HttpGet("folderId={id}")]
        public IActionResult GetTasksByFolderId(int id)
        {
            return Ok(_repository.Tasks.GetAll().Where(x => x.FolderId == id));
        }

        [HttpPost("Create")]
        public IActionResult CreateTask([FromBody]CreateTaskData createTaskData)
        {
            var task = TaskMapper.ToDomain(createTaskData);

            _repository.Tasks.Create(task);

            _repository.Save();

            return Ok();
        }

        [HttpPut("Change")]
        public IActionResult ChangeTask([FromBody]ChangeTaskData changeTaskData)
        {
            var task = _repository.Tasks.GetById(changeTaskData.Id);

            if (task == null)
                return NotFound("Задача не найдена");

            task.Name = changeTaskData.Name;
            task.Description = changeTaskData.Description;
            task.ExpiryDate = changeTaskData.ExpiryDate;
            task.Status = changeTaskData.Status;
            task.FolderId = changeTaskData.FolderId;

            _repository.Tasks.Update(task);

            _repository.Save();

            return Ok();
        }

        [HttpPut("ChangeStatus/id={id}&status={status}")]
        public IActionResult ChangeTaskStatus(int id,int status)
        {
            var task = _repository.Tasks.GetById(id);

            if (task == null)
                return NotFound("Задача не найдена");

            task.Status = status;

            _repository.Tasks.Update(task);

            _repository.Save();

            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _repository.Tasks.GetById(id);

            if (task == null)
                return NotFound("Задача не найдена");

            _repository.Tasks.Delete(task);

            _repository.Save();

            return Ok();
        }
    }
}
