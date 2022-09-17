var loadData = function () {
    $.ajax({
        type: 'GET',
        url: '/Home/GetSpecififcData',
        success: onSuccess,
        failure: function (response) {

        },
        error: function (response) {

        },
    });
};
var onSuccess = function (response) {

    $('#tblclient').DataTable({
        bLengthChange: true,
        lengthMenu: [[5, 20, -1], [5, 10, "All"]],
        bFilter: true,
        bPaginate: true,
        data: response,
        destroy: true,
        columns: [{ 'data': 'EmpID' },
            { 'data': 'CompanyName' },
            { 'data': 'Designation' },
            { 'data': 'JoiningDate' },
            { 'data': 'RelievingDate' },
            { 'data': 'ReasonOfLeaving' },
            {
                'data': 'EmpID', "width": "150px", "render": function (EmpID) {
                    return '<button type="button" id="Updatecrd" data-toggle="modal" data-target="#staticBackdrop" class="btn btn-primary Updatecrd" onclick="return GetbyID(' + EmpID + ')"><i class="fa fa-edit">&nbspUpdate</i></button>'
                }
            },
            {
                'data': 'EmpID', "width": "150px", "render": function (EmpID) {
                    return '<button type="button" id="deleteemp" class="btn btn-danger" onclick="Delete(' + EmpID + ')"><i class="fa fa-trash">&nbspDelete</i></button>'
                }
            },

        ]
    })
}
loadData();

var city = function () {
    $.ajax({
        type: 'GET',
        url: '/Home/GetCity',
        success: function (response) {
            var droplist = "<option value='0'>--Select City--</option>";
            for (var i = 0; i < response.length; i++) {
                droplist += "<option value='" + response[i].CityID + "'>" + response[i].CityName + "</option>";
            }
            $('#ddCity').html(droplist);
        },
        error: function (response) {

        }
    });
};
city();


var desig = function () {
    $.ajax({
        type: 'GET',
        url: '/Home/GetDesignation',
        success: function (response) {
            var droplist = "<option value='0'>--Select Designation--</option>";
            for (var i = 0; i < response.length; i++) {
                droplist += "<option value='" + response[i].DesgID + "'>" + response[i].DesgName + "</option>";
            }
            $('#ddDesignation').html(droplist);
        },
        error: function (response) {

        }
    });
};
desig();

var InsertupdateExp = function () {
    var UserID = document.getElementById('txtUserID').value;
    var company = document.getElementById('txtcompany').value;
    var Designation = document.getElementById('txtDesignationE').value;
    var join = document.getElementById('txtJD').value;
    var Relieving = document.getElementById('txtRD').value;
    var Reason = document.getElementById('txtRL').value;
    $.ajax({
        type: "GET",
        url: "/Home/InsertupdateEmpExp",
        data: { UserID: UserID, CompanyName: company, Designation: Designation, JoiningDate: join, RelievingDate: Relieving, ReasonOfLeaving: Reason },
        //success: onSuccess,
        success: function (response) {
            alert(response);
            cleartxtbox();
            loadData();
        },
        error: function (response) {

        },
    });
};

//var city = function (cityid) {
//    $.ajax({
//        type: 'GET',
//        url: '/Home/GetCity?id=' + $('#ddState').val(),
//        success: function (response) {
//            var droplist = "<option value='0'>--Select City--</option>";
//            for (var i = 0; i < response.length; i++) {
//                droplist += "<option value='" + response[i].CityID + "'>" + response[i].CityName + "</option>";
//            }
//            $('#ddCity').html(droplist);
//            $('#ddCity').val(cityid);
//        },
//        error: function (response) {

//        }
//    });
//}

//var gender = function (cityid) {
//    var gen = "<option value='0' selected>--Select Gender--</option>";
//    gen += "<option value='Male'>Male</option>";
//    gen += "<option value='Female'>Female</option>";
//    gen += "<option value='Others'>Others</option>";
//    $('#ddGender').html(gen);
//}
//gender();
//$('#ddState').change(function () {
//    city();
//});

//var GetbyID = function (UserID) {
//    $.ajax({
//        type: "GET",
//        url: "/Home/GetSpecififcData?id=" + UserID,
//        success: function (response) {
//            $('#txtUserID').val(response[0].UserID);
//            $('#txtUserName').val(response[0].UserName);
//            $('#txtPassCode').val(response[0].PassCode);
//            $('#txtSalary').val(response[0].Salary);
//            $('#txtEmail').val(response[0].Email);
//            $('#ddState').val(response[0].StateID);
//            city(response[0].CityID);
//            $('#ddGender').val(response[0].Gender);
//        },
//        error: function (response) {

//        },
//    });
//}
//$('.clr').click(function () {
//    $('#txtUserID').val('');
//    $('#txtUserName').val('');
//    $('#txtPassCode').val('');
//    $('#txtSalary').val('');
//    $('#txtEmail').val('');
//    $('#ddGender').val('');
//    $('#ddState').val(0);
//    $('#ddCity').val(0);
//    gender();
//    return true;
//});
//var validation = function () {
//    if ($('#txtUserName').val().trim() == "") {
//        alert("Please Enter User Name");
//        $('#txtUserName').focus();
//        return false;
//    }
//    if ($('#txtPassCode').val().trim() == "") {
//        alert("Please Enter Salary");
//        $('#txtPassCode').focus();
//        return false;
//    }
//    if ($('#txtSalary').val().trim() == "") {
//        alert("Please Enter Salary");
//        $('#txtSalary').focus();
//        return false;
//    }
//    if ($('#txtEmail').val().trim() == "") {
//        alert("Please Enter Email");
//        $('#txtEmail').focus();
//        return false;
//    }
//    if ($('#ddGender').val() == "") {
//        alert("Please Select Gender");
//        $('#ddGender').focus();
//        return false;
//    }
//    if ($('#ddCity').val() == "") {
//        alert("Please Select City");
//        $('#ddCity').focus();
//        return false;
//    }
//    if ($('#ddState').val() == "") {
//        alert("Please Select State");
//        $('#ddState').focus();
//        return false;
//    }
//    return true;
//};

var validateExp = function () {
    if (document.getElementById('txtcompany').value == "")
    {
        alert("Please Enter Company Name");
        document.getElementById('txtcompany').focus();
        return false;
    }
};


var cleartxtmainbox = function () {
   document.getElementById('txtUserID').value = "";
   document.getElementById('txtUserName').value = "";
   document.getElementById('ddDesignation').value = "";
   document.getElementById('ddCity').value = "";
   document.getElementById('txtDOB').value = "";
   $(input[name = "exampleRadios"]).prop('checked', false);
    //var Gender = $('.form-check-input :checked').text();
   $('input[name="exampleRadios"]').text("");
    //var Gender = document.getElementById("txtGender").value;
   document.getElementById("txtAddress").value = "";
   document.getElementById("txtMob").value = "";
   document.getElementById("txtEmail").value = "";
   $('input[name="Ispgcheck"]').val() = "";
};

var cleartxtbox = function () {
    document.getElementById('txtUserID').value = "";
    document.getElementById('txtcompany').value = "";
    document.getElementById('txtDesignationE').value = "";
    document.getElementById('txtJD').value = "";
    document.getElementById('txtRD').value = "";
    document.getElementById('txtRL').value = "";
};

var updateonsubmit = function () {
    var UserID = document.getElementById('txtUserID').value;
    var UserName = document.getElementById('txtUserName').value;
    var Designation = document.getElementById('ddDesignation').value;
    var City = document.getElementById('ddCity').value;
    var DOB = document.getElementById('txtDOB').value;
    //var Gender = $('.form-check-input :checked').text();
    var Gender = $('input[name="exampleRadios"]:checked').val();
    //var Gender = document.getElementById("txtGender").value;
    var Address = document.getElementById("txtAddress").value;
    var Mob = document.getElementById("txtMob").value;
    var Email = document.getElementById("txtEmail").value;
    var PG = $('input[name="Ispgcheck"]:checked').val();
    //var PG = document.getElementById("Ispg").value;
    //var Address = document.getElementById("txtAddress").value;
    //var f = document.getElementById("ddGender");
    //var ddGender = f.options[f.selectedIndex].text;
    $.ajax({
        type: "GET",
        url: "/Home/updateData",
        data: { UserID: UserID, UserName: UserName, Designation: Designation, City: City, DOB: DOB, Gender: Gender, Address: Address, Mob: Mob, Email: Email, PG: PG },
        //success: onSuccess,
        success: function (response) {
            alert("Your Employee ID is:- "+response);
            document.getElementById('txtUserID').value = response;
            loadData(response);
        },
        error: function (response) {

        },
    });
};

//var Delete = function (UserID) {
//    var conf = confirm("Are You Sure.. You Want to delete the Record");
//    if (conf) {
//        $.ajax({
//            type: 'GET',
//            url: '/Home/DeleteData',
//            data: { EID: UserID },
//            contentType: 'application/json',
//            dataType: 'json',
//            success: function (response) {
//                alert(response);
//                location.reload();
//            },
//            error: function (response) {

//            }

//        })
//    };
//}