using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Demo1.Models.EF;
using Demo1.Models.Convert;


namespace Demo1.Controllers
{
    public class StudentController : Controller
    {
        private QLSVDbContext db = new QLSVDbContext();

        // GET: Student
        public ActionResult Index()
        {
            List<Folk> folks = db.Folk.ToList();
            SelectList folksSL = new SelectList(folks, "ID", "Name");
            ViewBag.folks = folksSL;
            List<Class> classes = db.Class.ToList();
            SelectList classesSL = new SelectList(classes, "ID", "Name");
            ViewBag.classes = classesSL;
            return View();
        }
        [HttpGet]
        public JsonResult LoadStudent()
        {
            List<StudentJson> sts = new List<StudentJson>();
            var students = db.Student.ToList();
            foreach (Student st in students)
            {
                sts.Add(new StudentJson(st));
            }
            return Json(sts, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetOneStudent(int id)
        {
            var st = db.Student.Find(id);
            var student = new StudentJson(st);
            student.DateOfBirth = st.DateOfBirth.ToString("yyyy'-'MM'-'dd");
            return Json(student, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult SearchStudent(string searchStr)
        {
            List<StudentJson> sts = new List<StudentJson>();
            var students = db.Student.Where(st =>
            st.FullName.Contains(searchStr) || st.Class.Name.Contains(searchStr)
            || st.Folk.Name.Contains(searchStr) || st.Country.Contains(searchStr)
            ).ToList();
            foreach (Student st in students)
            {
                sts.Add(new StudentJson(st));
            }
            return Json(sts, JsonRequestBehavior.AllowGet);
        }

        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public JsonResult Create(List<string> obj)
        {
            int status = 1;
            try
            {
                Student st = new Student();
                st.FullName = obj[0];
                st.DateOfBirth = DateTime.Parse(obj[1]);
                st.Country = obj[2];
                st.FolkID = Int32.Parse(obj[3]);
                st.ClassID = Int32.Parse(obj[4]);
                db.Student.Add(st);
                db.SaveChanges();
            }
            catch
            {
                status = 0;
            }
                       
            return Json(status);
        }

        // POST: Student/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public JsonResult Edit(List<string> obj)
        {
            bool status = true;
           try
            {
                int id = Int32.Parse(obj[5]);
                Student st = db.Student.Find(id);
                //st.ID = Int32.Parse(obj[5]);
                st.FullName = obj[0];
                st.DateOfBirth = DateTime.Parse(obj[1]);
                st.Country = obj[2];
                st.FolkID = Int32.Parse(obj[3]);
                st.ClassID = Int32.Parse(obj[4]);
                db.Entry(st).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch
            {
                status = false;
            }
            return Json(status);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            bool status = true;
            try
            {
                Student student = db.Student.Find(id);
                db.Student.Remove(student);
                db.SaveChanges();
            }
            catch
            {
                status = false;
            }
            
            return Json(status);
        }

        public List<Student> getStudent()
        {
            return db.Student.ToList();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
