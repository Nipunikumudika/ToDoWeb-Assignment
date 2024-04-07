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
        public async Task<ActionResult<List<ToDoTask>>> GetTasks(int id)
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


        //update a task
        [HttpPut]
        public async Task<ActionResult<ToDoTask>> UpdateTask(ToDoTask updatedToDoTask)
        {
            if (updatedToDoTask != null)
            {
                var toDoTask = await appDbContext.ToDoTasks.FirstOrDefaultAsync(e => e.Id == updatedToDoTask.Id);
                if (toDoTask != null)
                {
                    toDoTask= updatedToDoTask;
                    await appDbContext.SaveChangesAsync();

                    var tasks = await appDbContext.ToDoTasks.ToListAsync();
                    return Ok(tasks);
                }
                return NotFound();
            }
            return BadRequest();
        }
    }
}