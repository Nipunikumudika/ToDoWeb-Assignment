using System.ComponentModel.DataAnnotations;

namespace ToDoBackend.Models
{
    public class ToDoTask
    {
        public int Id { get; set; }
        public string? TaskName { get; set; }
        public string? Description { get; set; }
        public bool? TaskStatus { get; set; }
        public DateTime? Date { get; set; }
        public int UserId { get; set; }


    }
}
