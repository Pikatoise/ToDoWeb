using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ToDo.DAL.Interfaces;

namespace ToDo.DAL.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly AppDbContext _appDbContext;

        public BaseRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public TEntity Create(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Create error: Entity is null");

            _appDbContext.Add(entity);

            return entity;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _appDbContext.Set<TEntity>().AsNoTracking();
        }

        public IQueryable<TEntity> GetByCondition(Expression<Func<TEntity, bool>> expression)
        {
            return _appDbContext.Set<TEntity>().Where(expression).AsNoTracking();
        }

        public TEntity Update(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Update error: Entity is null");

            _appDbContext.Update(entity);

            return entity;
        }

        public TEntity Delete(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException("Delete error: Entity is null");

            _appDbContext.Remove(entity);

            return entity;
        }
    }
}
