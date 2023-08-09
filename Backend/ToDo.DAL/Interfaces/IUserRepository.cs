using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Domain.Models;

namespace ToDo.DAL.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public User? GetByLogin(string login);
        public User? GetById(int id);
    }
}
