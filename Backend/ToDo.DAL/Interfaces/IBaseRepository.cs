namespace ToDo.DAL.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        Task<TEntity> CreateAsync(TEntity entity);
        IQueryable<TEntity> ReadAsync();
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<TEntity> DeleteAsync(TEntity entity);
    }
}
