using ToDo.DAL.Interfaces;
using ToDo.Domain.Models;

namespace ToDo.DAL.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
        
        public User? GetByLogin(string login) =>
            _appDbContext.Set<User>().Where(x => x.Login.Equals(login)).FirstOrDefault();

        public User? GetById(int id) =>
            _appDbContext.Set<User>().Where(x => x.Id == id).FirstOrDefault();
    }
}
