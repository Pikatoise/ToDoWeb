using Microsoft.AspNetCore.Mvc;
using ToDo.DAL.Interfaces;
using ToDo.Domain.Models;

namespace ToDo.AspApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FolderController : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public FolderController(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
        }

        [HttpGet("")]
        public IActionResult GetAllFolders()
        {
            return Ok(_repository.Folders.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetFolderById(int id)
        {
            var folder = _repository.Folders.GetById(id);

            if (folder == null)
                return NotFound("Папка не найдена");

            return Ok(folder);
        }

        [HttpGet("profileId={profileId}")]
        public IActionResult GetFoldersByProfileId(int profileId)
        {
            var folders = _repository.Folders.GetByCondition(f => f.ProfileId == profileId);

            return Ok(folders);
        }

        [HttpPost("Create/profileId={profileId}&name={folderName}")]
        public IActionResult CreateFolder(int profileId, string folderName)
        {
            _repository.Folders.Create(new Folder()
            {
                Name = folderName,
                ProfileId = profileId,
            });

            _repository.Save();

            return Ok();
        }

        [HttpPut("Change/Name/id={id}&name={name}")]
        public IActionResult ChangeFolderName(int id, string name)
        {
            var folder = _repository.Folders.GetById(id);

            if (folder == null)
                return NotFound("Папка не найдена");

            folder.Name = name;

            _repository.Folders.Update(folder);

            _repository.Save();

            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteFolder(int id) 
        {
            var folder = _repository.Folders.GetById(id);

            if (folder == null)
                return NotFound("Папка не найдена");

            _repository.Folders.Delete(folder);

            _repository.Save();

            return Ok();
        }
    }
}
