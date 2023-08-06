using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.DAL.Interfaces;

namespace ToDo.DAL.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        AppDbContext _appDbContext;
        IUserRepository _users;
        IProfileRepository _profiles;

        public IUserRepository Users { 
            get
            {
                if (_users == null)
                    _users = new UserRepository(_appDbContext);

                return _users;
            } 
        }

        public IProfileRepository Profiles
        {
            get
            {
                if (_profiles == null)
                    _profiles = new ProfileRepository(_appDbContext);

                return _profiles;
            }
        }

        public RepositoryWrapper(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Save()
        {
            _appDbContext.SaveChanges();
        }
    }
}
