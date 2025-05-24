using System;
using System.Collections.Generic;

namespace MeganomPoligraph.Models
{
    public class Admin
    {
        public int AdminID { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
