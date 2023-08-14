using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.DAL.Interfaces;
using ToDo.Domain.Models;

namespace ToDo.DAL.Repositories
{
    public class FolderRepository : BaseRepository<Folder>, IFolderRepository
    {
        public FolderRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            
        }

        public Folder? GetById(int id) =>
            _appDbContext.Set<Folder>().Where(x => x.Id == id).FirstOrDefault();
    }
}
