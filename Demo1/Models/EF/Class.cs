using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Demo1.Models.EF
{
    public class Class
    {
        public int ID { get; set; }
        [StringLength(50)]
        public String Name { get; set; }
    }
}