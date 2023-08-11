namespace ToDo.DAL.Interfaces
{
    public interface ITaskRepository : IBaseRepository<Domain.Models.Task>
    {
        public Domain.Models.Task? GetById(int id);
        public IQueryable<Domain.Models.Task> GetByProfileId(int profileId);
    }
}
