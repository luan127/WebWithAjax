using System;
using System.Collections.Generic;
//using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Demo1.Models.EF
{
    public class QLSVDbContext: DbContext
    {
        public QLSVDbContext():base("name=QLSVDbContext")
            {}
        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<Folk> Folk { get; set; }
        public virtual DbSet<Class> Class { get; set; }
    }
}