using System.ComponentModel.DataAnnotations;

namespace ToDo.AspApi.Dto
{
    [Serializable]
    public class DeleteManyTasksData
    {
        [Required(ErrorMessage = "Выберите задачи для удаления")]
        public int[] Tasks { get; set; }
    }
}
