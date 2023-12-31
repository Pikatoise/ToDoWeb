﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.DAL.Interfaces
{
    public interface IRepositoryWrapper
    {
        IUserRepository Users { get; }
        IProfileRepository Profiles { get; }
        ITaskRepository Tasks { get; }
        IFolderRepository Folders { get; }
        void Save();
        bool DbStatus();
    }
}
