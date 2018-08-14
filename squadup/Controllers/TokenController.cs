using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace squadup.Controllers {
    public class TokenController : Controller {
        private readonly IConfiguration _config;

        public TokenController (IConfiguration config) {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken ([FromBody] LoginModel login) {
            IActionResult response = Unauthorized ();
            UserModel user = Authenticate (login);

            if (user != null) {
                var tokenString = BuildToken (user);
                response = Ok (new { token = tokenString });
            }

            return response;
        }

        private string BuildToken (UserModel user) {
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (_config["Jwt:Key"]));
            var credentials = new SigningCredentials (key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken (_config["Jwt:Issuer"], _config["Jwt:Issuer"], expires : DateTime.Now.AddMinutes (30), signingCredentials : credentials);
            return new JwtSecurityTokenHandler ().WriteToken (token);
        }

        private UserModel Authenticate (LoginModel login) {
            UserModel user = null;

            if (login.Username == "mario" && login.Password == "secret") {
                user = new UserModel {
                Name = "Mario Rossi",
                Email = "mario.rossi@gmail.com",
                Birthdate = new DateTime (1990, 10, 5)
                };
            }

            return user;
        }

        public class LoginModel {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class UserModel {
            public string Name { get; set; }
            public string Email { get; set; }
            public DateTime Birthdate { get; set; }
        }
    }
}