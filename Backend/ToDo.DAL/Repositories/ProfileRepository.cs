using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.DAL.Interfaces;
using ToDo.Domain.Models;

namespace ToDo.DAL.Repositories
{
    public class ProfileRepository : BaseRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            
        }

        public Profile? GetById(int id) =>
            _appDbContext.Set<Profile>().Where(x => x.Id == id).FirstOrDefault();
    }
}
