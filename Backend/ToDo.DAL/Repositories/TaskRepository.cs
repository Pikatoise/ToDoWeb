using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ToDo.DAL.Interfaces;

namespace ToDo.DAL.Repositories
{
    public class TaskRepository : BaseRepository<Domain.Models.Task>, ITaskRepository
    {
        public TaskRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            
        }

        public Domain.Models.Task? GetById(int id) =>
            _appDbContext.Set<Domain.Models.Task>().Where(x => x.Id == id).FirstOrDefault();

        public IQueryable<Domain.Models.Task> GetByProfileId(int profileId) =>
            _appDbContext.Set<Domain.Models.Task>().Where(x => x.ProfileId == profileId).AsNoTracking();
    }
}
