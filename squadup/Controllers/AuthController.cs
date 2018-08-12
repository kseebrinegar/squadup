using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace squadup.Controllers {
    [Route ("api/[controller]")]
    public class AuthController : Controller {
        [HttpPost ("token")]
        public IActionResult Token () {
            var header = Request.Headers["Authorization"];
            if (header.ToString ().StartsWith ("Basic")) {
                string credValue = header.ToString ().Substring ("Basic ".Length).Trim ();
                string[] usernameAndPass = Encoding.UTF8.GetString (Convert.FromBase64String (credValue)).Split (":");

                if (usernameAndPass[0] == "Admin" && usernameAndPass[1] == "pass") {
                    Claim[] claims = new [] { new Claim (ClaimTypes.Name, usernameAndPass[0]) };
                    SymmetricSecurityKey key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes ("jdsjksdjlsdfajodfsajkdasfklnwehwehkjewhkjrewkjhrewjkl"));

                    var token = new JwtSecurityToken (
                        issuer: "mysite.com",
                        audience: "mysite.com",
                        expires : DateTime.Now.AddMinutes (1),
                        claims : claims,
                        signingCredentials : new SigningCredentials (key, SecurityAlgorithms.HmacSha256Signature)
                    );

                    var tokenString = new JwtSecurityTokenHandler ().WriteToken (token);
                    return Ok (tokenString);
                }
            }

            return BadRequest ("Error occured getting token");
        }
    }
}