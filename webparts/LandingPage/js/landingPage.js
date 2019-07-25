
$(document).ready(function () {
    getCurrentUser();
    
   
});
/////left Nevigation////////
function toggleLeftnav() {
    $(".sidenav").toggleClass("w-250");
    $("#Content_section").toggleClass("content_full");
}
function GetAllLeftNavItems(isAdmin, isDelete, isRead) {
    debugger;


    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('LeftNavigation')/items?$select=*&$filter=IsActive eq '1'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            debugger;
            var Items = data.d.results;
            if (Items.length > 0) {
                var html = "";
                $(Items).each(function (index) {
                    if ($(Items)[index].Title === 'Add' || $(Items)[index].Title === 'Edit' || $(Items)[index].Title === 'Delete') {
                        if (isAdmin) {
                            html = html + "<li><a href=" + $(Items)[index].Url + ">" + $(Items)[index].Title + "</a></li>";
                        }
                    }
                    else {
                        html = html + "<li><a href=" + $(Items)[index].Url + ">" + $(Items)[index].Title + "</a></li>";
                    }

                });
                $('ul#ConcertoleftNav').html(html);
                GetAllDatabaseItems();

            } else {
                alert("No Record Found in DatabaseMaster!");
                //$('#loadingDiv').hide();
                //alert("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);

            alert(data);
        }
    });
}


function getCurrentUser() {
    // getUserWebPermissionREST();
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            debugger;
            getCurrentUserGroupColl(data.d.Id);
        },
        error: function (data) {
            failure(data);
        }
    });

}
function getCurrentUserGroupColl(UserID) {
    $.ajax
        ({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetUserById(" + UserID + ")/Groups",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                debugger;
                /* get all group's title of current user. */
                var results = data.d.results;
                console.log(results);
                var isAdmin = false;
                var isDelete = false;
                var isRead = false;
                $(results).each(function (index) {
                    console.log('Title' + results[index].Title);
                    if (results[index].Title === "Concerto Admin") {
                        isAdmin = true;
                        if (sessionStorage) {
                            sessionStorage.setItem("isAdmin", true);
                        }
                        console.log('isAdmin:' + isAdmin);
                    } else {
                        sessionStorage.setItem("isAdmin", false);
                    }
                    if (results[index].Title === "Concerto Delete") {
                        isDelete = true;
                        if (sessionStorage) {
                            sessionStorage.setItem("isDelete", true);
                        }
                        console.log('isDelete' + isDelete);
                    } else {
                        sessionStorage.setItem("isDelete", false);
                    }
                    if (results[index].Title === "Concerto Read") {
                        isRead = true;
                        if (sessionStorage) {
                            sessionStorage.setItem("isRead", true);
                        }
                        console.log('isRead' + isRead);
                    } else {
                        sessionStorage.setItem("isRead", false);
                    }
                });


                GetAllLeftNavItems(isAdmin, isDelete, isRead);
            }
        });
}
///////////////////////////
function GetAllDatabaseItems() {    
    debugger;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('DatabaseMaster')/items?$select=*&$filter=IsActive eq '1'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            debugger;
            var Items = data.d.results;
            if (Items.length > 0) {
                var html = "";
                $(Items).each(function (index) {
                    html = html + "<div class='col-sm-3 text-center mt-4'><div><a href=" + $(Items)[index].Url + "><img src='/sites/rsyspedia/AppLibrary/webparts/LandingPage/images/report-icon.JPG' alt=" + $(Items)[index].Title + " title=" + $(Items)[index].Title + " class='img- responsive d- ib' /></a></div ><p class='fs-14 fw-7 mt-1'>" + $(Items)[index].Title +"</p></div>";                    
                });
                $('#divLandingPage').html(html);
              
            } else {
                alert("No Record Found in DatabaseMaster!");
                //$('#loadingDiv').hide();
                //alert("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);

            alert(data);
        }
    });
}
