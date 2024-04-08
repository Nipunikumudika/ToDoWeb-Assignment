using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoBackend.Models;
using System.Security.Cryptography;
using System.Text;

namespace ToDoBackend.Data
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public UsersController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Create a user // POST
        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(User newUser)
        {
            if (newUser != null)
            {
                // Encrypt password
                newUser.Password = EncryptPassword(newUser.Password!);

                _appDbContext.Users.Add(newUser);
                await _appDbContext.SaveChangesAsync();

                var users = await _appDbContext.Users.ToListAsync();
                return Ok(users);
            }
            return BadRequest();
        }

        // Login // POST
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User givenUser)
        {
            // Find user by username
            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == givenUser.Username);

            // Check if user exists and password matches
            if (user != null && VerifyPassword(givenUser.Password!, user.Password!))
            {
                return Ok(user);
            }

            return Unauthorized();
        }

        // Helper method to encrypt password
        private static string EncryptPassword(string password)
        {
            using SHA256 sha256 = SHA256.Create();
            byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        // Helper method to verify password
        private static bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return storedPassword == EncryptPassword(enteredPassword);
        }
    }
}
