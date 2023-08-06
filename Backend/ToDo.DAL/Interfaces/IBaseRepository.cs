using System.Linq.Expressions;

namespace ToDo.DAL.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        TEntity Create(TEntity entity);
        IQueryable<TEntity> ReadAll();
        TEntity Update(TEntity entity);
        TEntity Delete(TEntity entity);
        IQueryable<TEntity> ReadByCondition(Expression<Func<TEntity, bool>> expression);
    }
}
