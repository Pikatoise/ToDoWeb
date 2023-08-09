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
    }
}
