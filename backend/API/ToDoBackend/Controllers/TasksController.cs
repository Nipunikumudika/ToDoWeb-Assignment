using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoBackend.Data;
using ToDoBackend.Models;

namespace ToDoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        public TasksController(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }



        //get all tasks //read
        [HttpGet]
        public async Task<ActionResult<List<ToDoTask>>> GetTasks()
        {
            var tasks = await appDbContext.ToDoTasks.ToListAsync();
            return Ok(tasks);
        }



        //get task by id //read
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ToDoTask>> GetTask(int id)

        {
            var task = await appDbContext.ToDoTasks.FirstOrDefaultAsync(e => e.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(task);
            }

        }





        //create a task //post
        [HttpPost]
        public async Task<ActionResult<List<ToDoTask>>> AddTask(ToDoTask newToDoTask)
        {
            if (newToDoTask != null)
            {
                appDbContext.ToDoTasks.Add(newToDoTask);
                await appDbContext.SaveChangesAsync();

                var tasks = await appDbContext.ToDoTasks.ToListAsync();
                return Ok(tasks);

            }
            return BadRequest();
        }






        //delete a task //delete
        [HttpDelete]
        public async Task<ActionResult<List<ToDoTask>>> DeleteTask(int id)
        {
            var toDoTask = await appDbContext.ToDoTasks.FirstOrDefaultAsync(e => e.Id == id);
            if (toDoTask != null)
            {
                appDbContext.ToDoTasks.Remove(toDoTask);
                await appDbContext.SaveChangesAsync();

                var tasks = await appDbContext.ToDoTasks.ToListAsync();
                return Ok(tasks);

            }
            return BadRequest();
        }


        [HttpPut("{id:int}")]
public async Task<ActionResult<ToDoTask>> UpdateTask(int id, ToDoTask updatedToDoTask)
{
    if (updatedToDoTask != null)
    {
        var toDoTask = await appDbContext.ToDoTasks.FirstOrDefaultAsync(e => e.Id == id);
        if (toDoTask != null)
        {
            // Update properties individually
            toDoTask.TaskName = updatedToDoTask.TaskName;
            toDoTask.Description = updatedToDoTask.Description;
            toDoTask.Date = updatedToDoTask.Date;
            toDoTask.TaskStatus = updatedToDoTask.TaskStatus;

            await appDbContext.SaveChangesAsync();

            // Return the updated task
            return Ok(toDoTask);
        }
        return NotFound();
    }
    return BadRequest();
}


    }
}