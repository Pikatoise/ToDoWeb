using ToDo.AspApi.Dto;

namespace ToDo.AspApi.Mappers
{
    public static class TaskMapper
    {
        public static Domain.Models.Task ToDomain(CreateTaskData createTaskData) =>
            new Domain.Models.Task()
            {
                Name = createTaskData.Name,
                Description = createTaskData.Description,
                ExpiryDate = createTaskData.ExpiryDate,
                ProfileId = createTaskData.ProfileId,
                FolderId = createTaskData.FolderId,
            };
    }
}
