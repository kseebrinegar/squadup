using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace squadup.Controllers {
    [Route ("api/[controller]")]
    public class HomeController : Controller {
        [HttpGet, Authorize]
        public IEnumerable<string> Get () {
            return new string[] { "value1", "value2" };
        }
    }
}