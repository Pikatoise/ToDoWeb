﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("folderId={folderId}")]
        public IActionResult GetTasksByFolderId(int folderId)
        {
            return Ok(_repository.Tasks.GetAll().Where(x => x.FolderId == folderId));
        }

        [HttpGet("profileId={profileId}")]
        public IActionResult GetTasksByProfileId(int profileId)
        {
            return Ok(_repository.Tasks.GetAll().Where(x => x.ProfileId == profileId));
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

        [HttpDelete("Delete")]
        public IActionResult DeleteManyTasks([FromBody]DeleteManyTasksData manyTasksData)
        {
            foreach (var taskId in manyTasksData.Tasks)
            {
                var task = _repository.Tasks.GetById(taskId);

                if (task != null)
                    _repository.Tasks.Delete(task);
            }

            _repository.Save();

            return Ok();
        }

        [HttpDelete("Delete/folderId={folderId}")]
        public IActionResult DeleteTasksByFolderId(int folderId)
        {
            var tasks = _repository.Tasks.GetByCondition(t => t.FolderId == folderId);
            int count = tasks.Count();

            if (count > 0)
            {
                foreach (var task in tasks)
                    _repository.Tasks.Delete(task);

                _repository.Save();

                return Ok(count);
            }
            else
                return Ok(0);
        }
    }
}
