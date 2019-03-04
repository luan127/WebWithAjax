using Demo1.Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Demo1.Models.Convert
{
    public class StudentJson
    {
        public StudentJson(Student st)
        {
            this.FullName = st.FullName;
            this.ID = st.ID;
            this.Country = st.Country;
            this.DateOfBirth = st.DateOfBirth.ToShortDateString();
            this.FolkName = st.Folk.Name;
            this.ClassName = st.Class.Name;
            this.FolkID = st.FolkID;
            this.ClassID = st.ClassID;
        } 
        public int ID { get; set; }
        public int ClassID { get; set; }
        public int FolkID { get; set; }
        public string FullName { get; set; }
        public string Country { get; set; }
        public string DateOfBirth { get; set; }

        public string FolkName { get; set; }
        public string ClassName { get; set; }
    }
}