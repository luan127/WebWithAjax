using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Demo1.Models.EF
{
    public class Student
    {
        public int ID { get; set; }

        [StringLength(250)]
        public string FullName { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }

        [StringLength(250)]
        public string Country { get; set; }

        public int FolkID { get; set; }
        public int ClassID { get; set; }

        public virtual Folk Folk { get; set; }

        public virtual Class Class { get; set; }


    }
}