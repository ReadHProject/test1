using MVCExamsProject.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCExamsProject.Controllers
{
    public class HomeController : Controller
    {
        DBConnect DBObj = new DBConnect();
        // GET: Home
        public ActionResult EMPReg()
        {
            return View();
        }

        public ActionResult updateData(string UserID, string UserName, string Designation, string City, string DOB, string Gender, string Address, string Mob,string Email, string PG,string UploadFile)
        {
            try
            {
                if (PG == "Ispgcheck")
                {
                    PG = "1";
                }
                else
                {
                    PG = "0";
                }
                SqlParameter[] param1 = new SqlParameter[12];
                param1[0] = new SqlParameter("@UserName", UserName);
                param1[1] = new SqlParameter("@Email", Email);
                param1[2] = new SqlParameter("@CityID", Convert.ToInt16(City));
                param1[3] = new SqlParameter("@Gender", Gender);
                param1[4] = new SqlParameter("@Designation", Designation);
                param1[5] = new SqlParameter("@MobNo", Mob);
                param1[6] = new SqlParameter("@DOB", DOB);
                param1[7] = new SqlParameter("@Address", Address);
                param1[8] = new SqlParameter("@UploadFile", UploadFile);
                param1[9] = new SqlParameter("@IsPG", Convert.ToInt16(PG));
                param1[10] = new SqlParameter("@Rout", 1);
                param1[11] = new SqlParameter("@Action", "InsertEmpForm");
                SqlDataReader sdr = DBObj.ExecuteReaderSP("SP_EmployeeDetails", param1);
                if (sdr.HasRows)
                {
                    Session["id"] = null;
                    sdr.Read();
                    string id = sdr["Regid"].ToString();
                    Session["id"] = id;
                    return Json(id, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    ViewBag.Msg = "Error on Register!!";
                    return Json(ViewBag.Msg, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {

                ViewBag.Msg = "Error!!";
                return RedirectToAction("RegisterUser");
            }
        }


        public ActionResult GetCity()
        {
            List<EMPModel> lst = new List<EMPModel>();
            SqlParameter[] para = new SqlParameter[2];
            para[0] = new SqlParameter("@Action", "GetCity");
            para[1] = new SqlParameter("@Rout", 1);
            DataSet ds = DBObj.ExecuteDataSetSP("SP_EmployeeDetails", para);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                lst.Add(new EMPModel()
                {
                    CityID = int.Parse(dr["CityID"].ToString()),
                    CityName = dr["CityName"].ToString(),
                });
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDesignation()
        {
            List<EMPModel> lst = new List<EMPModel>();
            SqlParameter[] para = new SqlParameter[2];
            para[0] = new SqlParameter("@Action", "GetGesignation");
            para[1] = new SqlParameter("@Rout", 1);
            DataSet ds = DBObj.ExecuteDataSetSP("SP_EmployeeDetails", para);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                lst.Add(new EMPModel()
                {
                    DesgID = int.Parse(dr["DesgID"].ToString()),
                    DesgName = dr["DesgName"].ToString(),
                });
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSpecififcData()
        {
            int id = 0;
            if (Session["id"] != null)
            {
                id = Convert.ToInt16(Session["id"].ToString());
            }
            List<EMPModel> lst = new List<EMPModel>();
            SqlParameter[] para = new SqlParameter[2];
            para[0] = new SqlParameter("@UserID", id);
            para[1] = new SqlParameter("@Action", "GetSpecificEmp");
            DataSet ds = DBObj.ExecuteDataSetSP("SP_EmployeeDetails", para);
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                lst.Add(new EMPModel()
                {
                    EmpID = int.Parse(dr["EmpID"].ToString()),
                    CompanyName = dr["CompanyName"].ToString(),
                    Designation = dr["Designation"].ToString(),
                    JoiningDate = dr["JoiningDate"].ToString(),
                    RelievingDate = dr["RelievingDate"].ToString(),
                    ReasonOfLeaving = dr["ReasonOfLeaving"].ToString(),
                });
            }

            return Json(lst, JsonRequestBehavior.AllowGet);
        }


        public ActionResult InsertupdateEmpExp(string UserID, string CompanyName, string Designation, string JoiningDate, string RelievingDate, string ReasonOfLeaving)
        {
            try
            {
                UserID = "0";
                if (Session["id"] != null)
                {
                    UserID = Session["id"].ToString();
                }
                SqlParameter[] param1 = new SqlParameter[8];
                param1[0] = new SqlParameter("@EmpID", UserID);
                param1[1] = new SqlParameter("@CompanyName", CompanyName);
                param1[2] = new SqlParameter("@Designation", Designation);
                param1[3] = new SqlParameter("@JoiningDate", JoiningDate);
                param1[4] = new SqlParameter("@RelievingDate", RelievingDate);
                param1[5] = new SqlParameter("@ReasonOfLeaving", ReasonOfLeaving);
                param1[6] = new SqlParameter("@Rout", 1);
                param1[7] = new SqlParameter("@Action", "InsertEmpExp");
                int sdr = DBObj.ExecuteNonQuerySP("SP_EmployeeDetails", param1);
                if (sdr > 0)
                {
                    ViewBag.Mg = "Record Inserted Successfully!!";
                    return Json(ViewBag.Mg, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    ViewBag.Msg = "Error on Insert!!";
                    return Json(ViewBag.Msg, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {

                ViewBag.Msg = "Error!!";
                return RedirectToAction("RegisterUser");
            }
        }

        //public ActionResult GetCity(string id)
        //{
        //    List<ClientModel> lst = new List<ClientModel>();
        //    SqlParameter[] para = new SqlParameter[2];
        //    para[0] = new SqlParameter("@StateID", id);
        //    para[1] = new SqlParameter("@Action", "GetCity");
        //    DataSet ds = DBObj.ExecuteDataSetSP("SP_EmployeeDetails", para);
        //    foreach (DataRow dr in ds.Tables[0].Rows)
        //    {
        //        lst.Add(new ClientModel()
        //        {
        //            CityID = int.Parse(dr["CityID"].ToString()),
        //            CityName = dr["CityName"].ToString(),
        //        });
        //    }

        //    return Json(lst, JsonRequestBehavior.AllowGet);
        //}


    }
}