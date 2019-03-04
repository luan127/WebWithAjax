Delete();
Edit();
View();
function Delete() {
    $('.btnDelete').off('click').on('click', function () {

        var id = $(this).data('id');
        var result = confirm("Bạn có chắc chắn xóa?");
        if (result == true) {
            $.ajax({
                url: "/Student/Delete",
                type: "POST",
                data: { id: id },
                // contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (status) {
                    //alert(status);
                    if (status == true) {
                        $('#row_' + id + '').remove();
                    }
                    Clear();
                },
                error: function (errormessage) {
                    document.write(errormessage.responseText);
                }
            });
        }
        else {

        }
    })
}


function View() {
    $('.btnView').off('click').on('click', function () {
        var id = $(this).data('id');
        GetOneStudent(id);
        Disable();
        
    })
}


function Edit() {
    $('.btnEdit').off('click').on('click', function () {
        //alert(1);
        var id = $(this).data('id');
        GetOneStudent(id);
        Enable();
        Visible();
        $('#btnSend').off('click').on("click", function () {
            Send(0, id);
            //alert(1);
            //var id = $(this).data('id');
            //var fullName = $("#fullName").val();
            //var className = $("#className").val();
            //var dateOfBirth = $("#dateOfBirth").val().toString();
            //var country = $("#country").val();
            //var folk = $("#folk").val();
            //var obj = [fullName, dateOfBirth, country, folk, className, id];
            //$.ajax({
            //    url: "/Student/Edit",
            //    data: JSON.stringify(obj),
            //    type: "POST",
            //    contentType: "application/json;charset=utf-8",
            //    dataType: "json",
            //    success: function (status) {
            //        if (status == true) {
            //            Load();
            //        }
            //    },
            //    error: function () {
            //        alert("Thêm không thành công!");
            //    }
            //});
        });
        $('#btnCancel').off('click').on('click', function () {
            Clear();
            Disable();
        });

    })
}

function GetOneStudent (id)
{
    $.ajax({
        url: "/Student/GetOneStudent",
        data: { id: id },
        type: "GET",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (student) {
            // alert(student.DateOfBirth);
            var date = new Date(student.DateOfBirth);
            var str = student.DateOfBirth.toString();
            $("#fullName").val(student.FullName);
            $("#dateOfBirth").val(student.DateOfBirth.toString());
            $("#country").val(student.Country);
            $("#className").val(student.ClassID);
            $("#folk").val(student.FolkID);
            //Disable();
        },
        error: function () {
            alert("Thêm không thành công!");
        }
    });
}