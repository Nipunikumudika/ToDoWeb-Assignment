using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoBackend.Models;

namespace ToDoBackend.Data
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext appDbContext;

        public UsersController(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }



        //get all users //read
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await appDbContext.Users.ToListAsync();
            return Ok(users);
        }



        //get user by id //read
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<User>>> GetUser(int id)
        {
            var user = await appDbContext.Users.FirstOrDefaultAsync(e => e.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }

        }





        //create a user //post
        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(User newUser)
        {
            if (newUser != null)
            {
                appDbContext.Users.Add(newUser);
                await appDbContext.SaveChangesAsync();

                var users = await appDbContext.Users.ToListAsync();
                return Ok(users);

            }
            return BadRequest();
        }






        //delete a user //delete
        [HttpDelete]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var user = await appDbContext.Users.FirstOrDefaultAsync(e => e.Id == id);
            if (user != null)
            {
                appDbContext.Users.Remove(user);
                await appDbContext.SaveChangesAsync();

                var users = await appDbContext.Users.ToListAsync();
                return Ok(users);

            }
            return BadRequest();
        }


        //update a user
        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(User UpdatedUser)
        {
            if (UpdatedUser != null)
            {
                var user = await appDbContext.Users.FirstOrDefaultAsync(e => e.Id == UpdatedUser.Id);
                if (user != null)
                {
                    user = UpdatedUser;
                    await appDbContext.SaveChangesAsync();

                    var users = await appDbContext.Users.ToListAsync();
                    return Ok(users);
                }
                return NotFound();
            }
            return BadRequest();
        }
    }

}
