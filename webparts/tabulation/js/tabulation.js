var db = '';
var constants = {
    TableInfo: 'TableInfo',
    isAdmin: false,
    isDelete: false,
    isRead: false
};
$(document).ready(function () {
    
    //$('#allTables').dataTable({
    //    "paging": false,
    //    "info": false
    //});
    db = getParameterByName('db');
    getCurrentUser();
  
});
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function GetItemsByListName(listName, db) {   
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items?$select=*&$filter=((Database eq '" + db + "') and(IsActive eq '1'))",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            var Items = data.d.results;
            if (Items.length > 0) {
                $('#loadingDiv').show();
                //Make Table 
                debugger;
                MakeHtmlStructure(Items);
                $('#loadingDiv').hide();

            } else {
                $('#loadingDiv').hide();
                alert("Items not found!!");
            }
        },
        error: function (data) {
            console.log("Error - GetItemsByListName Method !!");
            $('#loadingDiv').hide();
        }
    });
}
function MakeHtmlStructure(Items) {
    debugger;
    var sb = new StringBuilder();
    if (constants.isAdmin == true) {
        sb.append('<thead class="bg-org text-w">' +
                                    '<tr>' +
                                      '<th class="text-center">#</th>' +
                                      '<th>Table</th>' +
                                      '<th>Category</th>' +
                                      '<th>Description</th>' +
                                      '<th class="text-center">Edit</th>' +
                                      '<th class="text-center">Delete</th>' +
                                  '</tr>' +
                              '</thead>' +
                              '<tbody id="tblSechema">');
    } else if (constants.isDelete == true) {
        sb.append('<thead class="bg-org text-w">' +
                                   '<tr>' +
                                     '<th class="text-center">#</th>' +
                                     '<th>Table</th>' +
                                     '<th>Category</th>' +
                                     '<th>Description</th>' +
                                     '<th class="text-center">Edit</th>' +                                     
                                 '</tr>' +
                             '</thead>' +
                             '<tbody id="tblSechema">');
    } else {
        sb.append('<thead class="bg-org text-w">' +
                                     '<tr>' +
                                       '<th class="text-center">#</th>' +
                                       '<th>Table</th>' +
                                       '<th>Category</th>' +
                                       '<th>Description</th>' +
                                       
                                   '</tr>' +
                               '</thead>' +
                               '<tbody id="tblSechema">');
    }
   
    $(Items).each(function (index) {
        var desc;
        if ($(this)[0].Description != "" && $(this)[0].Description != null && $($(this)[0].Description).html().length > 180) {
           
            desc = $($(this)[0].Description).html().substring(0, 180) + '<span style="display: none;">' + $($(this)[0].Description).html().substr(180) + '</span> <a onclick="ShowMore(this)">More...</a>';
        } else {
            if ($($(this)[0].Description).html().length > 0) {
                desc = $($(this)[0].Description).html();
            }else {
                desc = '';
            }
           
        }
        var table = $(this)[0].Title != 'undefined' && $(this)[0].Title != null ? $(this)[0].Title : '';
        var database = $(this)[0].Database != 'undefined' && $(this)[0].Database != null ? $(this)[0].Database : '';
        var tableType = $(this)[0].Category != 'undefined' && $(this)[0].Category != null ? $(this)[0].Category : '';
        if (constants.isAdmin == true) {
            sb.append('<tr id=' + $(this)[0].ID + '> <td><span class="label label-default">' + (index + 1) + '</span></td><td id="tblName"><a id="anchTable"  href="/sites/rsyspedia/SitePages/TableDetails.aspx?Kid=' + $(this)[0].ID + '"><span class="Pointer">' + table + '</span></a></td><td><span>' + tableType + '</span></td><td><span>' + desc + '</span></td><td class="text-center"> <a href="/sites/rsyspedia/SitePages/EditTable.aspx?Kid=' + $(this)[0].ID + '"><span class="glyphicon glyphicon-pencil text-org"></span></a></td><td class="text-center"> <a ><span class="glyphicon glyphicon-trash text-org" onclick="DeleteItemById(' + $(this)[0].ID + ')"></span></a></td></tr>');  //<td> <a href="#"><span class="glyphicon glyphicon-pencil"></span></a></td><td> <a href="#"><span class="glyphicon glyphicon-remove"></span></a></td>
        } else if (constants.isDelete == true) {
            sb.append('<tr id=' + $(this)[0].ID + '> <td><span class="label label-default">' + (index + 1) + '</span></td><td id="tblName"><a id="anchTable"  href="/sites/rsyspedia/SitePages/TableDetails.aspx?Kid=' + $(this)[0].ID + '"><span class="Pointer">' + table + '</span></a></td><td><span>' + tableType + '</span></td><td><span>' + desc + '</span></td><td class="text-center"> <a href="/sites/rsyspedia/SitePages/EditTable.aspx?Kid=' + $(this)[0].ID + '"><span class="glyphicon glyphicon-pencil text-org"></span></a></td></tr>');
        } else {
            sb.append('<tr id=' + $(this)[0].ID + '> <td><span class="label label-default">' + (index + 1) + '</span></td><td id="tblName"><a id="anchTable"  href="/sites/rsyspedia/SitePages/TableDetails.aspx?Kid=' + $(this)[0].ID + '"><span class="Pointer">' + table + '</span></a></td><td><span>' + tableType + '</span></td><td><span>' + desc + '</span></td></tr>');  
        }
        
        $('#s4-workspace #allTables').html(sb.toString());
    });
    sb.append('</tbody>');
}
function ShowMore(v) {
    
    if ($(v).html() == 'More...') {
        $(v).prev().show();
        $(v).html('Less...');
    } else if ($(v).html() == 'Less...') {
        $(v).prev().hide();
        $(v).html('More...');
    }
}
///////////////////Delete/////////////////////////////
function DeleteItemById(id) {
    var r = confirm("Are you sure you want to delete this item?");
    debugger;
    if (r == true) {
        //e.preventDefault(); 
        debugger;
        deleteListItem(constants.TableInfo, id);

    }

}
function deleteListItem(list, itemId) {
    debugger;
    var clientContext = new SP.ClientContext.get_current();
    debugger;

    var oList = clientContext.get_web().get_lists().getByTitle(list);
    debugger;

    this.oListItem = oList.getItemById(itemId);
    debugger;

    oListItem.set_item('IsActive', false);

    oListItem.update();
    debugger;

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceededDelete), Function.createDelegate(this, this.onQueryFailedDelete));
}

function onQuerySucceededDelete() {

    alert('Item deleted');
    window.location.href = "/sites/rsyspedia/SitePages/Tables.aspx?db=" + db + '';
}

///////////////////Delete/////////////////////////////

//////////////////Permissions & Left Nav////////////////

function toggleLeftnav() {
    $(".sidenav").toggleClass("w-250");
    $("#Content_section").toggleClass("content_full");
}
function GetAllLeftNavItems(isAdmin, isContributor, isRead) {
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
                        if (isAdmin && isContributor) {
                            html = html + "<li><a href=" + $(Items)[index].Url + ">" + $(Items)[index].Title + "</a></li>";
                        } else if (isAdmin) {
                            html = html + "<li><a href=" + $(Items)[index].Url + ">" + $(Items)[index].Title + "</a></li>";
                        }else if (isContributor) {                            
                           html = html + "<li><a href=" + $(Items)[index].Url + ">" + $(Items)[index].Title + "</a></li>"; 
                        }
                    }
                    else {
                        html = html + "<li><a href=" + $(Items)[index].Url + ">" + $(Items)[index].Title + "</a></li>";
                    }

                });
                $('ul#ConcertoleftNav').html(html);
                GetItemsByListName(constants.TableInfo,db);
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
                $(results).each(function (index) {
                    console.log('Title' + results[index].Title);
                    if (results[index].Title === "Concerto Admin") {
                        constants.isAdmin = true;
                        console.log('isAdmin:' + constants.isAdmin);
                    }                   
                    if (results[index].Title === "Concerto Contributors") {
                        constants.isDelete = true;             
                        console.log('isDelete' + constants.isDelete);
                    }
                    if (results[index].Title === "Concerto Read") {
                        constants.isRead = true;
                        console.log('isRead' + constants.isRead);
                    }
                });


                GetAllLeftNavItems(constants.isAdmin, constants.isDelete, constants.isRead);
            }
        });
}

//$('table#allTables tbody td span').on('click', 'a.more', function (e) { alert('done'); });

//$('table#allTables tbody td span').on("click", "a", function (e) { //user click on remove text
//    debugger;
//    e.preventDefault();
//    alert('done');
//    if ($(this).html() == 'More') {
//        $(this).html('Less');
//    } else if ($(this).html() == 'Less') {
//        $(this).html('More');
//    }


//});
////////////////////////////////////////////
// Strinig StringBuilder
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
}

// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}