using System.ComponentModel.DataAnnotations;

namespace ToDoBackend.Models
{
    public class ToDoTask
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "TaskName is required")]
        public string? TaskName { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "TaskStatus is required")]
        public bool TaskStatus { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }
    }
}
