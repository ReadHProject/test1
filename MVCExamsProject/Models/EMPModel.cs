using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MVCExamsProject.Models
{
    public class EMPModel
    {
        public int UserID { get; set; }

        [Required(ErrorMessage = "Enter User Name")]
        [DisplayName("User Name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Enter Email")]
        [DisplayName("Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Enter Gender")]
        [DisplayName("Gender")]
        public string Gender { get; set; }

        public string CityName { get; set; }
        public string DOB { get; set; }
        public string Address { get; set; }
        public string MobNo { get; set; }

        public string IsPG { get; set; }

        public int CityID { get; set; }
        public int DesgID { get; set; }
        public string DesgName { get; set; }
        public int EmpID { get; set; }

        public string CompanyName { get; set; }
        public string Designation { get; set; }
        public string JoiningDate { get; set; }
        public string RelievingDate { get; set; }
        public string ReasonOfLeaving { get; set; }
        public HttpPostedFileBase photoUpload { get; set; }
    }
}