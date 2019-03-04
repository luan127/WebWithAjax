$(document).ready(function () {
    Load();
    Search();
    Create();
    Disable();
    //Hide();
});
function Load() {
    Clear();
    $.ajax({
        url: "/Student/LoadStudent",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr id="row_' + item.ID + '">';
                html += '<td class="text-center">' + item.FullName + '</td>';
                html += '<td class="text-center">' + item.DateOfBirth + '</td>';
                html += '<td class="text-center">' + item.Country + '</td>';
                html += '<td class="text-center">' + item.ClassName + '</td>';
                html += '<td class="text-center">' + item.FolkName + '</td>';
                html += '<td class="text-center"> <button class="btn-success btnView" data-id=' + item.ID + '> Xem </button>' +
                        '<button class="btn-success btnEdit" data-id=' + item.ID + '> Sửa </button>' +
                        '<button class="btn-success btnDelete" data-id=' + item.ID + '> Xóa </button>' + '</td>';
                html += '</tr>';
            });
            $('#tbody').html(html);
            $('#tbody').append('<script src="/Scripts/MyJS/other.js"></script>');
            Disable();
            Hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Search() {
    $('#searchStr').keyup(function () {
        var searchStr = $(this).val().trim(' ');
        if (searchStr != '') {
            $.ajax({
                url: "/Student/SearchStudent",
                data: {searchStr:searchStr},
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var html = '';
                    $.each(result, function (key, item) {
                        html += '<tr id="row_' + item.ID + '" >';
                        html += '<td class="text-center">' + item.FullName + '</td>';
                        html += '<td class="text-center">' + item.DateOfBirth + '</td>';
                        html += '<td class="text-center">' + item.Country + '</td>';
                        html += '<td class="text-center">' + item.ClassName + '</td>';
                        html += '<td class="text-center">' + item.FolkName + '</td>';
                        html += '<td class="text-center"> <button class="btn-success btnView" data-id=' + item.ID + '> Xem </button>' +
                                '<button class="btn-success btnEdit" data-id=' + item.ID + '> Sửa </button>' +
                                '<button class="btn-success btnDelete" data-id=' + item.ID + '> Xóa </button>' + '</td>';
                        html += '</tr>';
                    });
                    $('#tbody').html(html);
                    $('#tbody').append('<script src="/Scripts/MyJS/other.js"></script>');
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
        else
        {
            Load();
        }
    })
}

function Create() {
    $('#btnCreate').off('click').on('click', function () {
        Clear();
        Enable();
        Visible();
        $('#btnSend').off('click').on('click', function () {
            Send(1, 0);
        });
        Cancel();
    })
}
function Send(status, id)
{
    var fullName = $("#fullName").val();
    var className = $("#className").val();
    var dateOfBirth = $("#dateOfBirth").val().toString();
    var country = $("#country").val();
    var folk = $("#folk").val();
   
    if(status==1)
    {
        var obj = [fullName, dateOfBirth, country, folk, className];
        $.ajax({
            url: "/Student/Create",
            data: JSON.stringify(obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data == 1) {
                    Load();
                    Hide();
                }
            },
            error: function () {
                alert("Thêm không thành công!");
            }
        });

    }
    else
    {
        var obj = [fullName, dateOfBirth, country, folk, className, id];
        $.ajax({
            url: "/Student/Edit",
            data: JSON.stringify(obj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (status) {
                if (status == true) {
                    Load();
                }
            },
            error: function () {
                alert("Thêm không thành công!");
            }
        });
    }
}
function Clear()
{
    $("#fullName").val('');
    //$("#dateOfBirth").val("");
    $("#country").val('');
    $("#className").val('');
    $("#folk").val('');
}
function Hide()
{
    $('#btnSend').css('visibility', 'hidden');
    $('#btnCancel').css('visibility', 'hidden');
}
function Visible() {
    $('#btnSend').css('visibility', 'visible');
    $('#btnCancel').css('visibility', 'visible');
}
function Disable() {
    $('#fullName').prop('readOnly', true);
    $('#country').prop('readOnly', true);
    $('#dateOfBirth').prop('readOnly', true);
    $('#folk').prop('disabled', true);
    $('#className').prop('disabled', true);
}
function Enable() {
    $('#fullName').removeProp('readOnly');
    $('#country').removeProp('readOnly');
    $('#dateOfBirth').removeProp('readOnly');
    $('#folk').removeProp('disabled');
    $('#className').removeProp('disabled');
}
function Cancel() {
    $('#btnCancel').off('click').on('click', function () {
        Clear();
        Disable();
        Hide();
    });
}

