var constants = {
    TableInfo: 'TableInfo',
    TableColumns: 'Table_Columns',
    TableIndex: 'Table_Index',
    TableObjects: 'Table_InterdependencyObjects',
    TableConstraints: 'Table_Constraints',
    TableDocuments: 'Table_Documents',
    TableChildEntities: 'Table_ChildEntities',
    TableParentEntities: 'Table_ParentEntities',
    CategoryMaster: 'CategoryMaster',
    isAdmin: false,
    isDelete: false,
    isRead: false,
    TableId: 0
}

$(document).ready(function () {

    $(".openbtn").click(function () {
        $(".sidenav").toggleClass("w-250");
        $("#Content_section").toggleClass("content_full");
    });
    // $('#lblTableCreationDate').datepicker();
    //    language: 'en',
    //    pick12HourFormat: true
    //});
    constants.TableId = getParameterByName('Kid');
    GetCategories();
    getCurrentUser();

});

function hideDocument() {
    $('div#brdDocument').addClass('hide');
}

//////////////////Bind Dropdown////////////////
function GetCategories() {
    debugger;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.CategoryMaster + "')/items?$select=Title",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Dbo_Schema List

            var Items = data.d.results;
            if (Items.length > 0) {

                BindCategories(Items);
            } else {
                $('#loadingDiv').hide();
                alert("No Records Found in Category List!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}

function BindCategories(Items) {
    var sb = new StringBuilder();
    $(Items).each(function (index) {
        var title = $(this)[0].Title;
        sb.append("<li class='category' onclick=SetDropdown('" + encodeURIComponent(title) + "')><a href='#'>" + title + "</a></li>");
    });
    $('ul#ddlCategory').html(sb.toString());
}

function SetDropdown(catValue) {
    $('#txtCategory').val(decodeURIComponent(catValue));
}


///////////////////////////////////////////////
//////////////////Permissions/////////////////////
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
                GetItemById(constants.TableInfo, 'ID', constants.TableId);
            } else {
                alert("No Record Found in DatabaseMaster!");
                //$('#loadingDiv').hide();
                //alert("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
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
            //if (data.d.Title == "Navneet Srivastava") {
            //    alert('Sorry, The Page is under construction, You can access after publish.');
            //    window.location.href = "https://concertohealth.sharepoint.com/sites/rsyspedia/SitePages/welcome.aspx";
            //} else {
                getCurrentUserGroupColl(data.d.Id);
           // }

        },
        error: function (data) {
            failure(data);
            $('#divloader').addClass('hide');
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
                    if (results[index].Title === "Concerto Delete") {
                        constants.isDelete = true;
                        console.log('isDelete' + constants.isDelete);
                    }
                    if (results[index].Title === "Concerto Read") {
                        constants.isRead = true;
                        console.log('isRead' + constants.isRead);
                    }
                   
                });


                GetAllLeftNavItems(constants.isAdmin, constants.isDelete, constants.isRead);
            },
            error: function (data) {
                failure(data);
                $('#divloader').addClass('hide');
            }
        });
}
////////////////End Permissions///////////////////
//////////////TableInfo//////////////////////////
function GetItemById(listname, filterExpression, id) {
    debugger;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + listname + "')/items?$select=*&$filter=" + filterExpression + " eq '" + id + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Dbo_Schema List

            var Item = data.d.results;
            if (Item.length > 0) {

                BindTable(Item);
            } else {
                $('#loadingDiv').hide();
                //alert("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(data);
        }
    });
}
function BindTable(item) {


    var tableName = $(item)[0].TableName != null ? $(item)[0].TableName : '';
    var ID = $(item)[0].ID != null ? $(item)[0].ID : '';
    $('#divHeader').html(tableName);
    $('#txtTable').val(tableName);
    $('#txtTableDescription').html($(item)[0].Description != null ? $(item)[0].Description : '');
    $('#txtTechnicalNotes').val($(item)[0].TechnicalNotes != null ? $(item)[0].TechnicalNotes : '');
    $('#txtDataGranularity').val($(item)[0].DataGranularity != null ? $(item)[0].DataGranularity : '');
    $('#txtSourceApplication').val($(item)[0].DataSource != null ? $(item)[0].DataSource : '');
    //$('#txtConstraints').val($(item)[0].Constraints != undefined ? $(item)[0].Constraints : '');
    $('#txtSQL').val($(item)[0].SQLScript != null ? $(item)[0].SQLScript : '');
    //$('#txtAssumptions').val($(item)[0].Assumptions != undefined ? $(item)[0].Assumptions : '');
    //$('#txtSeeAlso').val($(item)[0].SeeAlso != undefined ? $(item)[0].SeeAlso : '');
    $('#txtTriggers').val($(item)[0].Triggers != null ? $(item)[0].Triggers : '');
    $('#txtObjectUsedToPopulate').val($(item)[0].ObjectUsed != null ? $(item)[0].ObjectUsed : '');
    $('#txtDataLoadType').val($(item)[0].DataLoadType != null ? $(item)[0].DataLoadType : '');
    $('#txtDataLoadFrequency').val($(item)[0].DataLoadFrequency != null ? $(item)[0].DataLoadFrequency : '');
    $('#txtSchemaName').val($(item)[0].SchemaName != null ? $(item)[0].SchemaName : '');
    //$('#tblName').html(tableName);
    $('#lblTableCreationDate').val($(item)[0].CreationDate != null ? $(item)[0].CreationDate : '');
    $('#lblFileGroup').val($(item)[0].FileGroup != null ? $(item)[0].FileGroup : '');

    var SystemObject = $(item)[0].SystemObject != null && $(item)[0].SystemObject != null ? $(item)[0].SystemObject : false;
    if (SystemObject == true) {
        $('#lblSystemObject').attr('checked', SystemObject);
    }


    $('#lblDataBase').html($(item)[0].Database != null ? $(item)[0].Database : '');
    $('#lblRows').val($(item)[0].RowCount != null ? $(item)[0].RowCount : '');
    $('#lblDataSpaceUsed').val($(item)[0].DataSpace != null ? $(item)[0].DataSpace : '');
    //$('#lblIndexSpaceUsed').val($(item)[0].IndexSpaceUsed != undefined ? $(item)[0].IndexSpaceUsed : '');


    //var date = getTodayDate();
    //$('#datetimepicker1').val(date);



    if ($(item)[0].Category != null && $(item)[0].Category != '') {
        setAktivMenu('txtCategory', $(item)[0].Category);
    }
    //if ($(item)[0].Database != undefined && $(item)[0].Database != '') {
    //    setAktivMenu('btnDatabase', $(item)[0].Database);
    //}
    if ($(item)[0].TableName != null && $(item)[0].TableName != '') {
        GetFiltereColumnsItemByTableId(ID);
        GetFiltereObjectsItemByTableId(ID);
        GetFiltereIndexesItemByTableId(ID);
        GetConstraintsItemByTableId(ID);
        GetParentRelationShipsByTableId(ID);
        GetChildRelationShipsByTableId(ID);
        // GetFiltereRelationsShipsItemByTableId(ID);

    }

}

function getTodayDate() {
    var m_names = new Array("Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec");

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    var date = curr_date + "-" + m_names[curr_month] + "-" + curr_year;
    return date;
}


//////////////End TableInfo//////////////////////////
/////////////////Columns//////////////////////
function GetFiltereColumnsItemByTableId(ID) {
    debugger;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableColumns + "')/items?$select=*,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
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
                BindColumnsTable(Items);
            } else {
                // $('#divloader').addClass('hide');
                $('#s4-workspace #tbColumn').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            // $('#divloader').addClass('hide');
            $('#divloader').addClass('hide');
            alert(Json.stringify(data));
        }
    });
}
function BindColumnsTable(Items) {
    debugger;
    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var ID = $(this)[0].ID != null && $(this)[0].ID != null ? $(this)[0].ID : "";
        var ColumnName = $(this)[0].ColumnName != null && $(this)[0].ColumnName != null ? $(this)[0].ColumnName : "";
        var ColumnDescription = $(this)[0].Description != null && $(this)[0].Description != null ? $(this)[0].Description : "";
        var DataType = $(this)[0].DataType != null && $(this)[0].DataType != null ? $(this)[0].DataType : "";
        var Length = $(this)[0].Length != null && $(this)[0].Length != null ? $(this)[0].Length : "";
        var Nulls = $(this)[0].IsNull != null && $(this)[0].IsNull != null ? $(this)[0].IsNull : "";
        var Identity = $(this)[0].Identity != null && $(this)[0].Identity != null ? $(this)[0].Identity : "";
        var Increment = $(this)[0].Increment != null && $(this)[0].Increment != null ? $(this)[0].Increment : "";
        var Unique = $(this)[0].Unique != null && $(this)[0].Unique != null ? $(this)[0].Unique : "";
        var Seed = $(this)[0].Seed != null && $(this)[0].Seed != null ? $(this)[0].Seed : "";
        //var Seed = $(this)[0].Seed != undefined && $(this)[0].Seed != null ? $(this)[0].Seed : "";
        var Key_x0020__x0028_PK_x002f_FK_x00 = $(this)[0].Key_x0020__x0028_PK_x002f_FK_x00 != null && $(this)[0].Key_x0020__x0028_PK_x002f_FK_x00 != null ? $(this)[0].Key_x0020__x0028_PK_x002f_FK_x00 : "";
        var Formula = $(this)[0].Formula != null && $(this)[0].Formula != null ? $(this)[0].Formula : "";
        var Default = $(this)[0].Default_x0020_Value != null && $(this)[0].Default_x0020_Value != null ? $(this)[0].Default_x0020_Value : "";
        var SqlCode = typeof $(this)[0].SQLCode != null && $(this)[0].SQLCode != null ? $(this)[0].SQLCode : '';
        var DataSource = $(this)[0].DataSource != null && $(this)[0].DataSource != null ? $(this)[0].DataSource : '';
        var FKEntity = $(this)[0].FKEntity != null && $(this)[0].FKEntity != null ? $(this)[0].FKEntity : "";
        var FKRelationship = $(this)[0].FKRelationship != null && $(this)[0].FKRelationship != null ? $(this)[0].FKRelationship : "";
        var FKColumn = $(this)[0].FKColumn != null && $(this)[0].FKColumn != null ? $(this)[0].FKColumn : "";

        //sb.append('<tr id=' + $(this)[0].ID + '><td id="' + ID + '"><span class="label label-default">' + (index + 1) + '</span></td><td  id="' + ID + '"> <input type="text" value="' + ColumnName + '" class="form-control"></td><td id="' + ID + '"> <textarea class="form-control" rows="1" id="Description">' + ColumnDescription + '</textarea></td><td id="' + ID + '"><input type="text" value="' + Datatype + '" class="form-control"></td><td id="' + ID + '"><input type="text" value="' + Length + '" class="form-control"></td><td id="' + ID + '"><input type="text" value="' + Nulls + '" class="form-control"></td><td id="' + ID + '"><input type="text" value="' + Default + '" class="form-control"></td><td id="' + ID + '"><textarea class="form-control" rows="1">' + Formula + '</textarea></td><td id="' + ID + '"><textarea class="form-control" rows="1">' + SqlCode + '</textarea></td><td id="' + ID + '"><textarea class="form-control" rows="1">' + DataSource + '</textarea></td><td  id="' + ID + '" class="DeleteColumnRow"><div class="delete-btn"><a href="#"><span class="glyphicon glyphicon-minus"></span></a></div></td> </tr>');

        sb.append("<tr id=" + ID + " class='my-auto'>" +
            +"<span onclick='ShowColumnbyId(this);' class='glyphicon glyphicon-pencil text-org'></span>" +
                    "<td style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtColumnName' value=" + ColumnName + ">" +
                    "</td>" +
                    "<td style='vertical-align:top;'>" +
                        "<textarea class='form-control' rows='5' id='txtDescription'>" + ColumnDescription + "</textarea>" +
                     "</td>" +
                      "<td  style='vertical-align:top;'>" +
                                "<textarea class='form-control' rows='5' id='txtFormula'>" + Formula + "</textarea>" +
                            "</td>" +
                    "<td  style='vertical-align:top;'>" +
                                "<textarea class='form-control' rows='5' id='txtSQLCode'>" + SqlCode + "</textarea>" +
                              "</td>" +
                    "<td  style='vertical-align:top;'>" +
                                "<textarea class='form-control' rows='5' id='txtDataSource'>" + DataSource + "</textarea>" +
                     "</td>" +
                    "<td style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtDatatype' value=" + DataType + ">" +
                    "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtKey' value=" + Key_x0020__x0028_PK_x002f_FK_x00 + ">" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtLength' value=" + Length + ">" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtNotNull' value=" + Nulls + ">" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtUnique' value=" + Unique + ">" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtDefaultValue' value=" + Default + ">" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtIdentity' value=" + Identity + ">" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtSeed' value=" + Seed + ">" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtIncrement' value=" + Increment + ">" +
                      "</td>" +
                   
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtFKEntity' value=" + FKEntity + ">" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtFKRelationship' value=" + FKRelationship + ">" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtFKColumn' value=" + FKColumn + ">" +
                     "</td>" +
                    "<td  style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                            "<span id='spndelete'  class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                    "</td>" +

                "</tr>");
    });
    $('#s4-workspace #tbColumn').html(sb.toString());


}
///////////////////Quick Edit ////////////////////
function ShowColumnbyId(v) {
    debugger;
    var id = $(v).closest('tr').attr('id');
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableColumns + "')/items?$select=*&$filter=ID eq '" + id + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Dbo_Schema List

            var Item = data.d.results;
            if (Item.length > 0) {

                BindColumnDetails(Item);
            } else {
                $('#loadingDiv').hide();
                //alert("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(data);
        }
    });
}
function BindColumnsTable(Item) {
    var tr = '';
    var sb = new StringBuilder();
   
        /*var desc ;
        if($(this)[0].TableDescription != 'undefined'){

        desc =  $(this)[0].TableDescription.length > 25?$(this)[0].TableDescription.substring(0,25)+'...':$(this)[0].TableDescription;
        }else{
        desc = '';
        }*/
    var ColumnName = $(Item).ColumnName != undefined && $(Item).ColumnName != null ? $(Item).ColumnName : '';
    var ColumnDescription = $(Item).Description != undefined && $(Item).Description != null ? $(Item).Description : '';
    var DataType = $(Item).DataType != undefined && $(Item).DataType != null ? $(Item).DataType : '';
    var Length = $(Item).Length != undefined && $(Item).Length != null ? $(Item).Length : '';
    var Key = $(Item).Key_x0020__x0028_PK_x002f_FK_x00 != undefined && $(Item).Key_x0020__x0028_PK_x002f_FK_x00 != null ? $(Item).Key_x0020__x0028_PK_x002f_FK_x00 : '';
    var Nulls = $(Item).IsNull != undefined && $(Item).IsNull != null ? $(Item).IsNull : '';
    var Unique = $(Item).Unique != undefined && $(Item).Unique != null ? $(Item).Unique : '';
    var Formula = $(Item).Formula != undefined && $(Item).Formula != null ? $(Item).Formula : '';
    var Default = $(Item).Default_x0020_Value != undefined && $(Item).Default_x0020_Value != null ? $(Item).Default_x0020_Value : '';
    var Identity = $(Item).Identity != undefined && $(Item).Identity != null ? $(Item).Identity : '';
    var Seed = $(Item).Seed != undefined && $(Item).Seed != null ? $(Item).Seed : '';
    var Increment = $(Item).Increment != undefined && $(Item).Increment != null ? $(Item).Increment : '';
    var SQLCode = typeof $(Item).SQLCode != undefined && $(Item).SQLCode != null ? $(Item).SQLCode : '';
    var DataSource = $(Item).DataSource != undefined && $(Item).DataSource != null ? $(Item).DataSource : '';
    var FKEntity = $(Item).FKEntity != undefined && $(Item).FKEntity != null ? $(Item).FKEntity : '';
    var FKRelationship = $(Item).FKRelationship != undefined && $(Item).FKRelationship != null ? $(Item).FKRelationship : '';
    var FKColumn = $(Item).FKColumn != undefined && $(Item).FKColumn != null ? $(Item).FKColumn : '';

       
}
//////////////////////////////////////////////////


function AddRowToColumns() {


    var tr = "<tr class='my-auto'>" +

                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control'>" +
                    "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<textarea class='form-control' rows='5' id='txtDescription'></textarea>" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtDatatype'>" +
                    "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtKey'>" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtLength'>" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtNotNull'>" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtUnique'>" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtDefaultValue' >" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtIdentity'>" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtSeed'>" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtIncrement'>" +
                      "</td>" +
                    "<td  style='vertical-align:top;'>" +
                                "<textarea class='form-control' rows='5' id='txtFormula'></textarea>" +
                            "</td>" +
                    "<td  style='vertical-align:top;'>" +
                                "<textarea class='form-control' rows='5' id='txtSQLCode'></textarea>" +
                              "</td>" +
                    "<td  style='vertical-align:top;'>" +
                                "<textarea class='form-control' rows='5' id='txtDataSource'></textarea>" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtFKEntity'>" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtFKRelationship'>" +
                     "</td>" +
                    "<td  style='vertical-align:top;'>" +
                        "<input type='text' class='form-control' id='txtFKColumn'>" +
                     "</td>" +
                    "<td  style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                            "<span id='spndelete' class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                    "</td>" +

                "</tr>";

    $('#s4-workspace #tbColumn').append(tr);

}

/////////////End Columns////////////////////////
///////////Submit Table////////////////////////
//var tables1 = {
//    ID: 'ID',
//    txtTable,
//    Database,
//    txtTechnicalNotes,
//    txtTableDescription,
//    txtSourceApplication,
//    txtDataGranularity,
//    txtCategory,
//    txtDataLoadFrequency,
//    txtDataLoadType,
//    txtTriggers,
//    txtSQL,
//    txtSchemaName,
//    txtObjectUsedToPopulate,
//    lblTableCreationDate,
//    lblFileGroup,
//    lblSystemObject,
//    lblRows,
//    lblDataSpaceUsed

//};
var tables = {
    ID: 'ID',
    TableName: 'TableName',
    Database: 'Database',
    TechnicalNotes: 'TechnicalNotes',
    Description: 'Description',
    DataSource: 'DataSource',
    DataGranularity: 'DataGranularity',
    Category: 'Category',
    DataLoadFrequency: 'DataLoadFrequency',
    DataLoadType: 'DataLoadType',
    Triggers: 'Triggers',
    SQLScript: 'SQLScript',
    SchemaName: 'SchemaName',
    ObjectUsed: 'ObjectUsed',
    CreationDate: 'CreationDate',
    FileGroup: 'FileGroup',
    // lblSystemObject,
    RowCount: 'RowCount',
    DataSpace: 'DataSpace'

};
var tablesValues = {
    ID: '',
    TableName: '',
    Database: '',
    TechnicalNotes: '',
    Description: '',
    DataSource: '',
    DataGranularity: '',
    Category: '',
    DataLoadFrequency: '',
    DataLoadType: '',
    Triggers: '',
    SQLScript: '',
    SchemaName: '',
    ObjectUsed: '',
    CreationDate: '',
    FileGroup: '',
    // lblSystemObject,
    RowCount: '',
    DataSpace: ''

};
function saveTableInfo() {
    $('#divloader').removeClass('hide');
    //  $('#divloader').show();
    tablesValues.ID = constants.TableId;
    tablesValues.TableName = $('#txtTable').val() != null && $('#txtTable').val() != "" ? $('#txtTable').val() : '';
    tablesValues.Database = $('#lblDataBase').html() != null && $('#lblDataBase').html() != "" ? $('#lblDataBase').html() : '';
    tablesValues.TechnicalNotes = $('#txtTechnicalNotes').val() != null && $('#txtTechnicalNotes').val() != "" ? $('#txtTechnicalNotes').val() : '';
    tablesValues.Description = $('#txtTableDescription').html() != null && $('#txtTableDescription').html() != "" ? $('#txtTableDescription').html() : '';
    tablesValues.DataSource = $('#txtSourceApplication').val() != null && $('#txtSourceApplication').val() != "" ? $('#txtSourceApplication').val() : '';
    tablesValues.DataGranularity = $('#txtDataGranularity').val() != null && $('#txtDataGranularity').val() != "" ? $('#txtDataGranularity').val() : '';
    tablesValues.Category = $('#txtCategory').val() != null && $('#txtCategory').val() != '' ? $('#txtCategory').val() : '';
    tablesValues.DataLoadFrequency = $('#txtDataLoadFrequency').val() != null && $('#txtDataLoadFrequency').val() != "" ? $('#txtDataLoadFrequency').val() : '';
    tablesValues.DataLoadType = $('#txtDataLoadType').val() != null && $('#txtDataLoadType').val() != "" ? $('#txtDataLoadType').val() : '';
    tablesValues.Triggers = $('#txtTriggers').val() != null && $('#txtTriggers').val() != "" ? $('#txtTriggers').val() : '';
    tablesValues.SQLScript = $('#txtSQL').val() != null && $('#txtSQL').val() != "" ? $('#txtSQL').val() : '';
    tablesValues.SchemaName = $('#txtSchemaName').val() != null && $('#txtSchemaName').val() != "" ? $('#txtSchemaName').val() : $('#txtSchemaName').val();
    tablesValues.ObjectUsed = $('#txtObjectUsedToPopulate').val() != null && $('#txtObjectUsedToPopulate').val() != "" ? $('#txtObjectUsedToPopulate').val() : '';
    tablesValues.CreationDate = $('#lblTableCreationDate').val() != null && $('#lblTableCreationDate').val() != "" ? $('#lblTableCreationDate').val() : '';
    tablesValues.FileGroup = $('#lblFileGroup').val() != null && $('#lblFileGroup').val() != "" ? $('#lblFileGroup').val() : '';
    //tablesValues.  $('#lblSystemObject').val();
    tablesValues.RowCount = $('#lblRows').val() != null && $('#lblRows').val() != "" ? $('#lblRows').val() : '';
    tablesValues.DataSpace = $('#lblDataSpaceUsed').val() != null && $('#lblDataSpaceUsed').val() != "" ? $('#lblDataSpaceUsed').val() : '';
    updateTableInfo(tablesValues);
}


function updateTableInfo(obj) {
    debugger;

    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(constants.TableInfo);

    //var itemCreateInfo = new SP.ListItemCreationInformation();
    //var oListItem = oList.addItem(itemCreateInfo);  
    var oListItem = oList.getItemById(obj.ID);

    //var lookupVar = new SP.FieldLookupValue();
    //lookupVar.set_lookupId(TableId);
    //oListItem.set_item('Table', lookupVar);

    oListItem.set_item(tables.TableName, obj.TableName);
    oListItem.set_item(tables.Database, obj.Database);
    oListItem.set_item(tables.TechnicalNotes, obj.TechnicalNotes);
    oListItem.set_item(tables.Description, obj.Description);
    oListItem.set_item(tables.DataSource, obj.DataSource);
    oListItem.set_item(tables.DataGranularity, obj.DataGranularity);
    oListItem.set_item(tables.Category, obj.Category);
    oListItem.set_item(tables.DataLoadFrequency, obj.DataLoadFrequency);
    oListItem.set_item(tables.DataLoadType, obj.DataLoadType);
    oListItem.set_item(tables.Triggers, obj.Triggers);
    oListItem.set_item(tables.SQLScript, obj.SQLScript);
    oListItem.set_item(tables.SchemaName, obj.SchemaName);
    oListItem.set_item(tables.ObjectUsed, obj.ObjectUsed);
    oListItem.set_item(tables.CreationDate, obj.CreationDate);
    oListItem.set_item(tables.FileGroup, obj.FileGroup);
    oListItem.set_item(tables.RowCount, obj.RowCount);
    oListItem.set_item(tables.DataSpace, obj.DataSpace);
    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(onQuerySucceededTables, onQueryFailed);



}
function onQuerySucceededTables() {
    //  $('#divloader').hide();
    $('#divloader').addClass('hide');
    alert('TableInfo updated Sucessfully.');
    //window.location.href = '/sites/rsyspedia/SitePages/EditTable.aspx?Kid=' + constants.TableId + '';
   
   // $('#btnUpdateTableTop').prop('disabled', true);
   // $('#btnUpdateTableBottom').prop('disabled', true);
   // $('ul#concertotab > .active').next('li').find('a').attr('data-toggle', 'tab');
}
function onQueryFailed(sender, args) {
    // $('#divloader').addClass('hide');
    //  $('#divloader').hide();
    $('#divloader').addClass('hide');
    alert(' Error occured in updating Table Info' + args.get_message() + '\n' + args.get_stackTrace());
}
///////////End Submit Table//////////////////////

/////////////Submit Columns//////////////////////
var columns = {
    ID: 'ID',
    ColumnName: 'ColumnName',
    ColumnDescription: 'Description',
    DataType: 'DataType',
    Length: 'Length',
    Nulls: 'IsNull',
    Identity: 'Identity',
    Increment: 'Increment',
    Unique: 'Unique',
    Seed: 'Seed',
    Key: 'Key_x0020__x0028_PK_x002f_FK_x00',
    Formula: 'Formula',
    Default: 'Default_x0020_Value',
    SqlCode: 'SQLCode',
    DataSource: 'DataSource',
    FKEntity: 'FKEntity',
    FKRelationship: 'FKRelationship',
    FKColumn: 'FKColumn'
};
var allColumns = [];
debugger;
function submitColumns() {
    $('#divloader').removeClass('hide');
    var tableName = $('#txtTable').val();
    if (tableName != null && tableName.length != 0) {
        //   $('#divloader').show();
        var counter = false;
        $('#tblColumns tbody tr').each(function (k, v) {
            var columnsValues = {
                ID: '',
                ColumnName: '',
                ColumnDescription: '',
                DataType: '',
                Length: '',
                Nulls: '',
                Identity: '',
                Increment: '',
                Unique: '',
                Seed: '',
                Key: '',
                Formula: '',
                Default: '',
                SqlCode: '',
                DataSource: '',
                FKEntity: '',
                FKRelationship: '',
                FKColumn: ''
            };

            if ($(this).attr('id') != null && $(this).attr('id') != "") {
                columnsValues.ID = $(this).attr('id');
                counter = true;
            }
            if ($(v).children("td").find('#txtColumnName').val() != null && $(v).children("td").find('#txtColumnName').val() != "") {
                columnsValues.ColumnName = $(v).children("td").find('#txtColumnName').val();
            }
            if ($(v).children("td").find('#txtDescription').val() != null && $(v).children("td").find('#txtDescription').val() != "") {
                columnsValues.ColumnDescription = $(v).children("td").find('#txtDescription').val();
            }
            if ($(v).children("td").find('#txtDatatype').val() != null && $(v).children("td").find('#txtDatatype').val() != "") {
                columnsValues.DataType = $(v).children("td").find('#txtDatatype').val();
            }
            if ($(v).children("td").find('#txtKey').val() != null && $(v).children("td").find('#txtKey').val() != "") {
                columnsValues.Key = $(v).children("td").find('#txtKey').val();
            }
            if ($(v).children("td").find('#txtLength').val() != null && $(v).children("td").find('#txtLength').val() != "") {
                columnsValues.Length = $(v).children("td").find('#txtLength').val();
            }
            if ($(v).children("td").find('#txtNotNull').val() != null && $(v).children("td").find('#txtNotNull').val() != "") {
                columnsValues.Nulls = $(v).children("td").find('#txtNotNull').val();
            }
            if ($(v).children("td").find('#txtIdentity').val() != null && $(v).children("td").find('#txtIdentity').val() != "") {
                columnsValues.Identity = $(v).children("td").find('#txtIdentity').val();
            }
            if ($(v).children("td").find('#txtUnique').val() != null && $(v).children("td").find('#txtUnique').val() != "") {
                columnsValues.Unique = $(v).children("td").find('#txtUnique').val();
            }
            if ($(v).children("td").find('#txtDefaultValue').val() != null && $(v).children("td").find('#txtDefaultValue').val() != "") {
                columnsValues.Default = $(v).children("td").find('#txtDefaultValue').val();
            }
            if ($(v).children("td").find('#txtSeed').val() != null && $(v).children("td").find('#txtSeed').val() != "") {
                columnsValues.Seed = $(v).children("td").find('#txtSeed').val();
            }
            if ($(v).children("td").find('#txtIncrement').val() != null && $(v).children("td").find('#txtIncrement').val() != "") {
                columnsValues.Increment = $(v).children("td").find('#txtIncrement').val();
            }
            if ($(v).children("td").find('#txtFormula').val() != null && $(v).children("td").find('#txtFormula').val() != "") {
                columnsValues.Formula = $(v).children("td").find('#txtFormula').val();
            }
            if ($(v).children("td").find('#txtSQLCode').val() != null && $(v).children("td").find('#txtSQLCode').val() != "") {
                columnsValues.SqlCode = $(v).children("td").find('#txtSQLCode').val();
            }
            if ($(v).children("td").find('#txtDataSource').val() != null && $(v).children("td").find('#txtDataSource').val() != "") {
                columnsValues.DataSource = $(v).children("td").find('#txtDataSource').val();
            }
            if ($(v).children("td").find('#txtFKEntity').val() != null && $(v).children("td").find('#txtFKEntity').val() != "") {
                columnsValues.FKEntity = $(v).children("td").find('#txtFKEntity').val();
            }
            if ($(v).children("td").find('#txtFKRelationship').val() != null && $(v).children("td").find('#txtFKRelationship').val() != "") {
                columnsValues.FKRelationship = $(v).children("td").find('#txtFKRelationship').val();
            }
            if ($(v).children("td").find('#txtFKColumn').val() != null && $(v).children("td").find('#txtFKColumn').val() != "") {
                columnsValues.FKColumn = $(v).children("td").find('#txtFKColumn').val();
            }
            if (counter) {
                allColumns.push(columnsValues);
                counter = false;
            }

        });
        if (allColumns.length > 0) {
            updateColumns(allColumns);
        }
    } else {
        $('#divloader').addClass('hide');
        alert('Table cannot be blank');
    }
}

function updateColumns(obj) {
    debugger;

    var itemArray = [];
    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(constants.TableColumns);
    for (var i = 0; i < obj.length ; i++) {
        //var itemCreateInfo = new SP.ListItemCreationInformation();
        //var oListItem = oList.addItem(itemCreateInfo);  
        var oListItem = oList.getItemById(obj[i].ID);

        //var lookupVar = new SP.FieldLookupValue();
        //lookupVar.set_lookupId(TableId);
        //oListItem.set_item('Table', lookupVar);
        oListItem.set_item(columns.ColumnName, obj[i].ColumnName);
        oListItem.set_item(columns.ColumnDescription, obj[i].ColumnDescription);
        oListItem.set_item(columns.DataType, obj[i].DataType);
        oListItem.set_item(columns.Key, obj[i].Key);
        oListItem.set_item(columns.Length, obj[i].Length);
        oListItem.set_item(columns.Nulls, obj[i].Nulls);
        oListItem.set_item(columns.Unique, obj[i].Unique);
        oListItem.set_item(columns.Default, obj[i].Default);
        oListItem.set_item(columns.Identity, obj[i].Identity);
        oListItem.set_item(columns.Seed, obj[i].Seed);
        oListItem.set_item(columns.Increment, obj[i].Increment);
        oListItem.set_item(columns.Formula, obj[i].Formula);
        oListItem.set_item(columns.SqlCode, obj[i].SqlCode);
        oListItem.set_item(columns.DataSource, obj[i].DataSource);
        oListItem.set_item(columns.FKEntity, obj[i].FKEntity);
        oListItem.set_item(columns.FKRelationship, obj[i].FKRelationship);
        oListItem.set_item(columns.FKColumn, obj[i].FKColumn);


        oListItem.update();
        itemArray[i] = oListItem;
        clientContext.load(itemArray[i]);

    }
    debugger;
    clientContext.executeQueryAsync(onQuerySucceededColumn, onQueryFailed);
}
function onQuerySucceededColumn() {
    // $('#divloader').hide();
    $('#divloader').addClass('hide');
    alert('Columns updated Sucessfully.');
    console.log('Columns updated Sucessfully');
    window.location.href = '/sites/rsyspedia/SitePages/EditTable.aspx?Kid='+constants.TableId+'';
    // disable Submit Columns buttons
   // $('#btnUpdateColumnsTop').prop('disabled', true);
   // $('#btnUpdateColumnsBottom').prop('disabled', true);

    // disable add new row buttons
   // $('#addNewColumnsRowTop').prop('disabled', true);
   // $('#addNewColumnsRowBottom').prop('disabled', true);

   // $('ul#concertotab > .active').next('li').find('a').attr('data-toggle', 'tab');
}
function onQueryFailed(sender, args) {
    //  $('#divloader').hide();
    $('#divloader').addClass('hide');
    alert('Could not add new duty: ' + args.get_message() + '\n' + args.get_stackTrace());
}
/////////////End Submit//////////////////////

//////////////Documents//////////////////////////
function FiltereDocumentsByTableId(ID) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('/sites/rsyspedia/Table_Documents/" + ID + "')/Files",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            debugger;
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {
                BindLibraryMetadata(Items);
            } else {
                //$('#loadingDiv').hide();
                $('#s4-workspace #tbDocuments').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}
function BindLibraryMetadata(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var Name = $(this)[0].Name != undefined && $(this)[0].Name != null ? $(this)[0].Name : '';
        var ServerRelativeUrl = $(this)[0].ServerRelativeUrl != undefined && $(this)[0].ServerRelativeUrl != null ? $(this)[0].ServerRelativeUrl : '';



        sb.append('<tr id=' + $(this)[0].ID + '> <td><span class="label label-default">' + (index + 1) + '</span></td><td><img class="img-thumbnail mw-2" src="' + ServerRelativeUrl + '"></td><td><span>' + Name + '</span></td><td><a href=' + ServerRelativeUrl + '><span>' + Name + '</span></a></td></tr>');

    });
    $('#s4-workspace #tbDocuments').html(sb.toString());
    //console.log(Items);

}
//////////////End Documents//////////////////////////

//////////////Constraints/////////////////////////
function GetConstraintsItemByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableConstraints + "')/items?$select=ID,Caption,ConstraintName,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {

                BindTableConstraints(Items);
            } else {
                //   $('#loadingDiv').hide();
                $('#s4-workspace #tbConstraint').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}

function BindTableConstraints(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var ID = $(this)[0].ID;
        var ConstraintName = $(this)[0].ConstraintName != undefined && $(this)[0].ConstraintName != null ? $(this)[0].ConstraintName : '';
        var Caption = $(this)[0].Caption != undefined && $(this)[0].Caption != null ? $(this)[0].Caption : '';

        sb.append("<tr id=" + $(this)[0].ID + ">" +
            "<td><input type='text' class='form-control' id='lblConstraint' value='" + ConstraintName + "'></td>" +
            "<td><input type='text' class='form-control' id='lblCaption' value='" + Caption + "'></td>" +
             "<td  style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                            "<span id='spndelete' class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                    "</td>" +
            "</tr>");
      
       // console.log(sb.toString());
    });
    $('#s4-workspace #tbConstraint').html(sb.toString());
}

function addNewRowConstraint() {
    var tr = "<tr>" +
              "<td><input type='text' class='form-control' id='lblConstraint'></td>" +
              "<td><input type='text' class='form-control' id='lblCaption'></td>" +
               "<td  style='vertical-align:top;' class='text-center my-auto'>" +
                          "<a onclick='DeleteRow(this)'>" +
                              "<span id='spndelete' class='glyphicon glyphicon-trash text-org'></span>" +
                          "</a>" +
                      "</td>" +
              "</tr>"
    $('#s4-workspace #tbConstraint').append(tr);
}
var Constraint = {
    ConstraintName: 'ConstraintName',
    Caption: 'Caption'
}
function submitConstraints() {
    $('#divloader').removeClass('hide');
    var tableName = $('#txtTable').val();
    if (tableName != null && tableName.length != 0) {
        var counter = false;
        var allConstraints = [];
        $('#tblConstraints tbody tr').each(function (k, v) {
            var ConstraintsValues = {
                ConstraintName: '',
                Caption: ''
            }

            if ($(this).attr('id') != null && $(this).attr('id') != "") {
                ConstraintsValues.ID = $(this).attr('id');
                counter = true;
            }
            if ($(v).children("td").find('#lblConstraint').val() != null && $(v).children("td").find('#lblConstraint').val() != "") {
                ConstraintsValues.ConstraintName = $(v).children("td").find('#lblConstraint').val();
            }
            if ($(v).children("td").find('#lblCaption').val() != null && $(v).children("td").find('#lblCaption').val != "") {
                ConstraintsValues.Caption = $(v).children("td").find('#lblCaption').val();
            }


            if (counter) {
                allConstraints.push(ConstraintsValues);
            }
           

        });
        if (allConstraints.length > 0) {
            updateConstraints(allConstraints);
        }
    } else {
        $('#divloader').addClass('hide');
        alert('Table cannot be null.');
    }
}
function updateConstraints(obj) {
    var itemArray = [];
    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(constants.TableConstraints);
    for (var i = 0; i < obj.length; i++) {
        var ListItem = oList.getItemById(obj[i].ID);

        ListItem.set_item(Constraint.ConstraintName, obj[i].ConstraintName);
        ListItem.set_item(Constraint.Caption, obj[i].Caption);
        ListItem.update();
        itemArray[i] = ListItem;

        clientContext.load(itemArray[i]);
    }
    clientContext.executeQueryAsync(onQuerySucceededConstraints, onQueryFailed);
}
function onQuerySucceededConstraints() {
    $('#divloader').addClass('hide');
    alert('Constraints updated sucessfully.');
}
//////////////End Constraints/////////////////////////
//////////////Objects/////////////////////////
function GetFiltereObjectsItemByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableObjects + "')/items?$select=ID,ObjectName,ObjectDescription,ObjectType,ObjectLocation,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {

                BindObjectsTable(Items);
            } else {
                //   $('#loadingDiv').hide();
                $('#s4-workspace #tbObject').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}

function BindObjectsTable(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {
        debugger;
        var ID = $(this)[0].ID != undefined && $(this)[0].ID != null ? $(this)[0].ID : '';
        var Object = $(this)[0].ObjectName != undefined && $(this)[0].ObjectName != null ? $(this)[0].ObjectName : '';
        var ObjectDescription = $(this)[0].ObjectDescription != undefined && $(this)[0].ObjectDescription != null ? $(this)[0].ObjectDescription : '';
        var ObjectType = $(this)[0].ObjectType != undefined && $(this)[0].ObjectType != null ? $(this)[0].ObjectType : '';
        var ObjectLocation = $(this)[0].ObjectLocation != undefined && $(this)[0].ObjectLocation != null ? $(this)[0].ObjectLocation : '';


        sb.append("<tr id=" + $(this)[0].ID + ">" +
         "<td style='vertical-align:top;'><input type='text' class='form-control' id='lblObject' value=" + Object + "></td>" +
          "<td> <textarea class='form-control' rows='5' id='lblObjectDescription'>" + ObjectDescription + "</textarea></td>" +
        "<td style='vertical-align:top;'><input type='text' class='form-control' id='lblObjectType' value=" + ObjectType + "></td>" +
        "<td style='vertical-align:top;'><input type='text' class='form-control' id='lblObjectLocation' value=" + ObjectLocation + "></td>" +
        "<td style='vertical-align:top;' class='text-center my-auto'>" +
            "<a onclick='DeleteRow(this)'>" +
            "<span class='glyphicon glyphicon-trash text-org'></span>" +
            "</a>" +
        "</td>" +
        "</tr>");

    });
    $('#s4-workspace #tbObject').html(sb.toString());
}
function addNewRowObject() {
    var tr = "<tr>" +
         "<td style='vertical-align:top;'><input type='text' class='form-control' id='lblObject'></td>" +
          "<td style='vertical-align:top;'><textarea class='form-control' rows='5' id='lblObjectDescription'></textarea></td>" +
        "<td style='vertical-align:top;'><input type='text' class='form-control' id='lblObjectType'></td>" +
        "<td style='vertical-align:top;'><input type='text' class='form-control' id='lblObjectLocation'></td>" +
        "<td style='vertical-align:top;' class='text-center my-auto'>" +
            "<a onclick='DeleteRow(this)'>" +
            "<span class='glyphicon glyphicon-trash text-org'></span>" +
            "</a>" +
        "</td>" +
        "</tr>"

    $('#s4-workspace #tbObject').append(tr);
}
var Objects = {
    Object: 'Object',
    ObjectDescription: 'ObjectDescription',
    ObjectType: 'ObjectType',
    ObjectLocation: 'ObjectLocation'
}
function submitObjects() {
    $('#divloader').removeClass('hide');
    var tableName = $('#txtTable').val();
    if (tableName != null && tableName.length != 0) {
        var counter = false;
        var allObjects = [];
        $('#tblObjects tbody tr').each(function (k, v) {
            var ObjectsValues = {
                Object: '',
                ObjectDescription: '',
                ObjectType: '',
                ObjectLocation: ''
            }

            if ($(this).attr('id') != null && $(this).attr('id') != "") {
                ObjectsValues.ID = $(this).attr('id');
                counter = true;
            }
            if ($(v).children("td").find('#lblObject').val() != null && $(v).children("td").find('#lblObject').val() != "") {
                ObjectsValues.Object = $(v).children("td").find('#lblObject').val();
            }
            if ($(v).children("td").find('#lblObjectDescription').val() != null && $(v).children("td").find('#lblObjectDescription').val() != "") {
                ObjectsValues.ObjectDescription = $(v).children("td").find('#lblObjectDescription').val();
            }
            if ($(v).children("td").find('#lblObjectType').val() != null && $(v).children("td").find('#lblObjectType').val() != "") {
                ObjectsValues.ObjectType = $(v).children("td").find('#lblObjectType').val();
            }
            if ($(v).children("td").find('#lblObjectLocation').val() != null && $(v).children("td").find('#lblObjectLocation').val() != "") {
                ObjectsValues.ObjectLocation = $(v).children("td").find('#lblObjectLocation').val();
            }

            if (counter) {
                allObjects.push(ObjectsValues);
            }
           

        });
        if (allObjects.length > 0) {
            updateObject(allObjects);
        }
    } else {
        $('#divloader').addClass('hide');
        alert('Table cannot be null.');
    }

}
function updateObject(obj) {
    var itemArray = [];
    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(constants.TableObjects);
    for (var i = 0; i < obj.length; i++) {
        var ListItem = oList.getItemById(obj[i].ID);

        ListItem.set_item(Objects.Object, obj[i].Object);
        ListItem.set_item(Objects.ObjectDescription, obj[i].ObjectDescription);
        ListItem.set_item(Objects.ObjectType, obj[i].ObjectType);
        ListItem.set_item(Objects.ObjectLocation, obj[i].ObjectLocation);
        ListItem.update();
        itemArray[i] = ListItem;

        clientContext.load(itemArray[i]);
    }
    clientContext.executeQueryAsync(onQuerySucceededObject, onQueryFailed);
}
function onQuerySucceededObject() {
    $('#divloader').addClass('hide');
    alert('Objects updated sucessfully.');
}
//////////////End Objects/////////////////////////
/////////////////Parent Relationship/////////////////////
function GetParentRelationShipsByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableParentEntities + "')/items?$select=ID,ParentEntityName,Attributes,ObjectType,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {

                BindParentRelationShip(Items);
            } else {
                //   $('#loadingDiv').hide();
                $('#s4-workspace #tbObject').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}

function BindParentRelationShip(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {
        debugger;
        var ID = $(this)[0].ID != undefined && $(this)[0].ID != null ? $(this)[0].ID : '';
        var ChildEntityName = $(this)[0].ParentEntityName != undefined && $(this)[0].ParentEntityName != null ? $(this)[0].ParentEntityName : '';
        var Attributes = $(this)[0].Attributes != undefined && $(this)[0].Attributes != null ? $(this)[0].Attributes : '';
        var ObjectType = $(this)[0].ObjectType != undefined && $(this)[0].ObjectType != null ? $(this)[0].ObjectType : '';


        sb.append("<tr id=" + ID + ">" +
                    "<td style='vertical-align:top;'>" +
                        "<input type='text' id='txtChildEntityName' class='form-control' value=" + ChildEntityName + ">" +
                    "</td>" +
                    "<td style='vertical-align:top;'>" +
                        "<input type='text' id='txtObjectType' class='form-control' value=" + ObjectType + ">" +
                     "</td>" +
                    "<td style='vertical-align:top;'>" +
                        "<textarea class='form-control' id='txtAttributes' rows='5'>" + Attributes + "</textarea>" +
                    "</td>" +
                   "<td style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                            "<span class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                 "</td>" +
                "</tr>");

    });
    $('#s4-workspace #tdparent').html(sb.toString());
}

/////////////////End Parent Relationship/////////////////
/////////////////Child Relationship/////////////////

function GetChildRelationShipsByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableChildEntities + "')/items?$select=ID,ChildEntityName,Attributes,ObjectType,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {

                BindChildRelationShip(Items);
            } else {
                //   $('#loadingDiv').hide();
                $('#s4-workspace #tbObject').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}

function BindChildRelationShip(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {
        debugger;
        var ID = $(this)[0].ID != undefined && $(this)[0].ID != null ? $(this)[0].ID : '';
        var ChildEntityName = $(this)[0].ChildEntityName != undefined && $(this)[0].ChildEntityName != null ? $(this)[0].ChildEntityName : '';
        var Attributes = $(this)[0].Attributes != undefined && $(this)[0].Attributes != null ? $(this)[0].Attributes : '';
        var ObjectType = $(this)[0].ObjectType != undefined && $(this)[0].ObjectType != null ? $(this)[0].ObjectType : '';


        sb.append("<tr id=" + ID + ">" +
                    "<td style='vertical-align:top;'>" +
                        "<input type='text' id='txtChildEntityName' class='form-control' value=" + ChildEntityName + ">" +
                    "</td>" +
                    "<td style='vertical-align:top;'>" +
                        "<input type='text' id='txtObjectType' class='form-control' value=" + ObjectType + ">" +
                     "</td>" +
                    "<td style='vertical-align:top;'>" +
                        "<textarea class='form-control' id='txtAttributes' rows='5'>" + Attributes + "</textarea>" +
                    "</td>" +
                   "<td style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                            "<span class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                 "</td>" +
                "</tr>");

    });
    $('#s4-workspace #tbchild').html(sb.toString());
}

/////////////////Delete Item////////////////////////
function DeleteItemById(v, listname) {
    debugger;
    $('#divloader').removeClass('hide');
    debugger;
    if (confirm("Are you sure, you want to delete this item.")) {
        var itemId = $(v).closest('tr').attr('id');
        if (itemId == null) {
            debugger;
            $(v).closest('tr').remove();
            
        } else if (itemId != null && itemId.length > 0) {
            debugger;
            $(v).closest('tr').remove();
            var clientContext = new SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle(listname);

            this.oListItem = oList.getItemById(itemId);

            oListItem.deleteObject();

            clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceededDelete), Function.createDelegate(this, this.onQueryFailedDelete));
        }
    }   
}

function onQuerySucceededDelete() {
    $('#divloader').addClass('hide');
    alert('Item deleted sucessfully');
}

function onQueryFailedDelete(sender, args) {
    $('#divloader').addClass('hide');

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
/////////////////Delete Item////////////////////////
function addNewRowChildRel(tbchild, listName) {
    var tr = "<tr>" +
                    "<td>" +
                        "<input id='txtChildEntityName' type='text' class='form-control'>" +
                    "</td>" +
                    "<td>" +
                        "<input id='txtObjectType' type='text' class='form-control'>" +
                     "</td>" +
                    "<td>" +
                         "<textarea class='form-control' id='txtAttributes' rows='5'></textarea>" +
                    "</td>" +
                   "<td style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                            "<span class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                 "</td>" +
                "</tr>";
    $('#s4-workspace #' + tbchild + '').append(tr);

}
var Entities = {
    ChildEntityName: 'ChildEntityName',
    ObjectType: 'ObjectType',
    Attributes: 'Attributes'
}
function submitEntities(listname, entityName,tbody) {
    debugger;
    $('#divloader').removeClass('hide');
    var tableName = $('#txtTable').val();
    if (tableName != null && tableName.length != 0) {
        var counter = false;
        var allEntities = [];
        var bodytag = "#" + tbody + " tbody tr";
      
        $(bodytag).each(function (k, v) {
            debugger;
            var EntitiesValues = {
                ChildEntityName: '',
                ObjectType: '',
                Attributes: ''
            }

            if ($(this).attr('id') != null && $(this).attr('id') != "") {
                EntitiesValues.ID = $(this).attr('id');
                counter = true;
            }
            if ($(v).children("td").find('#txtChildEntityName').val() != null && $(v).children("td").find('#txtChildEntityName').val() != "") {
                EntitiesValues.ChildEntityName = $(v).children("td").find('#txtChildEntityName').val();
            }

            if ($(v).children("td").find('#txtObjectType').val() != null && $(v).children("td").find('#txtObjectType').val() != "") {
                EntitiesValues.ObjectType = $(v).children("td").find('#txtObjectType').val();
            }
            if ($(v).children("td").find('#txtAttributes').val() != null && $(v).children("td").find('#txtAttributes').val() != "") {
                EntitiesValues.Attributes = $(v).children("td").find('#txtAttributes').val();
            }

            if (counter) {
                allEntities.push(EntitiesValues);
            }
           

        });
        if (allEntities.length > 0) {
            updateEntities(allEntities, listname, entityName);
        }
    } else {
        $('#divloader').addClass('hide');
        alert('Table cannot be null.');
    }
}
function updateEntities(obj, listname, entityName) {
    var itemArray = [];
    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listname);
    for (var i = 0; i < obj.length; i++) {
        var ListItem = oList.getItemById(obj[i].ID);

        ListItem.set_item(entityName, obj[i].ChildEntityName);
        ListItem.set_item(Entities.Attributes, obj[i].Attributes);
        ListItem.set_item(Entities.ObjectType, obj[i].ObjectType);

        ListItem.update();
        itemArray[i] = ListItem;

        clientContext.load(itemArray[i]);
    }
    clientContext.executeQueryAsync(onQuerySucceededEntities, onQueryFailed);
}
function onQuerySucceededEntities() {
    $('#divloader').addClass('hide');
    alert('Relationships updated sucessfully.');
}
/////////////////End Child Relationship/////////////////
///////////////Index///////////////////////////////////
function GetFiltereIndexesItemByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableIndex + "')/items?$select=ID,IndexName,IndexDescription,Items,Unique,IsClustered,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
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

                BindIndexTable(Items);
            } else {
                //   $('#loadingDiv').hide();
                $('#s4-workspace #tbIndex').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}

function AddNewRowIndex() {
    var tr = "<tr>" +
                     "<td style='vertical-align:top;text-align: center;'>" +
                         "<input id='txtIndexName' type='text' class='form-control'>" +
                     "</td>" +
                     "<td style='vertical-align:top;text-align: center;'>" +
                         "<input id='txtUnique' type='text' class='form-control'>" +
                     "</td>" +
                     "<td style='vertical-align:top;text-align: center;'>" +
                         "<input id='txtIsClustered' type='text' class='form-control'>" +
                     "</td>" +
                      "<td style='vertical-align:top;text-align: center;'>" +
                        "<pre><textarea id='txtItems' class='form-control' rows='5' id='Items'></textarea></pre>" +
                     "</td>" +
                    "<td style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                        "<span class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                    "</td>" +
        "</tr>";
    $('#s4-workspace #tbIndex').append(tr);
}

function BindIndexTable(Items) {

    var sb = new StringBuilder();
    var counter = false;
    $(Items).each(function (index) {


        var ID = $(this)[0].ID;
        var Index = $(this)[0].IndexName != undefined && $(this)[0].IndexName != null ? $(this)[0].IndexName : '';
        // var IndexDescription = $(this)[0].IndexDescription != undefined && $(this)[0].IndexDescription != null ? $(this)[0].IndexDescription : '';
        var Items = $(this)[0].Items != undefined && $(this)[0].Items != null ? $(this)[0].Items : '';
        var Unique = $(this)[0].Unique != undefined && $(this)[0].Unique != null ? $(this)[0].Unique : '';
        var IsClustered = $(this)[0].IsClustered != undefined && $(this)[0].IsClustered != null ? $(this)[0].IsClustered : '';
        // var Unique = $(this)[0].Unique != undefined && $(this)[0].Unique != null ? $(this)[0].Unique : false;
        // var IsClustered = $(this)[0].IsClustered != undefined && $(this)[0].IsClustered != null ? $(this)[0].IsClustered : false;

        sb.append("<tr id=" + ID + ">" +
                     "<td style='vertical-align:top;text-align: center;'>" +
                         "<input id='txtIndexName' type='text' class='form-control' value=" + Index + ">" +
                     "</td>" +
                     "<td style='vertical-align:top;text-align: center;'>" +
                         "<input id='txtUnique' type='text' class='form-control' value=" + Unique + ">" +
                     "</td>" +
                     "<td style='vertical-align:top;text-align: center;'>" +
                         "<input id='txtIsClustered' type='text' class='form-control' value=" + IsClustered + ">" +
                     "</td>" +
                      "<td style='vertical-align:top;text-align: center;'>" +
                        "<pre><textarea id='txtItems' class='form-control' rows='5' id='Items'>" + Items + "</textarea></pre>" +
                     "</td>" +
                    "<td style='vertical-align:top;' class='text-center my-auto'>" +
                        "<a onclick='DeleteRow(this)'>" +
                        "<span class='glyphicon glyphicon-trash text-org'></span>" +
                        "</a>" +
                    "</td>" +
        "</tr>");
    });

    $('#s4-workspace #tbIndex').html(sb.toString());

}



var indexValues = {


}
function submitIndex() {
    $('#divloader').removeClass('hide');
    debugger;
    var tableName = $('#txtTable').val();
    if (tableName != null && tableName.length != 0) {
        var allIndexes = [];
        var counter = false;

        $('#tblIndex tbody tr').each(function (k, v) {
            var Indexes = { ID: "", Index: "", Unique: "", IsClustered: "", Items: "" };

            counter = true;

            if ($(this).attr('id') != null && $(this).attr('id') != "") {
                Indexes.ID = $(this).attr('id');
                counter = true;
            }
            if ($(v).children("td").find('#txtIndexName').val() != null && $(v).children("td").find('#txtIndexName').val() != "") {
                Indexes.IndexName = $(v).children("td").find('#txtIndexName').val();
            }

            if ($(v).children("td").find('#txtUnique').val() != null && $(v).children("td").find('#txtUnique').val() != "") {
                Indexes.Unique = $(v).children("td").find('#txtUnique').val();
            }
            if ($(v).children("td").find('#txtIsClustered').val() != null && $(v).children("td").find('#txtIsClustered').val() != "") {
                Indexes.IsClustered = $(v).children("td").find('#txtIsClustered').val();
            }
            if ($(v).children("td").find('#txtItems').val() != null && $(v).children("td").find('#txtItems').val() != "") {
                Indexes.Items = $(v).children("td").find('#txtItems').val();
            }

            if (counter) {
                allIndexes.push(Indexes);
            }

        });
        if (allIndexes.length > 0) {

            addIndexItem(allIndexes);
        }
    } else {
        $('#divloader').addClass('hide');
        alert('Table cannot be null.');
    }
}
function addIndexItem(obj) {
    var itemArray = [];
    var clientContext = SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(constants.TableIndex);
    for (var i = 0; i < obj.length; i++) {
        var ListItem = oList.getItemById(obj[i].ID);
        //		 var Columns = {ColumnName:"",ColumnDescription:"",Datatype:"",Length :"",Nulls:"",Formula:"",Default:""};

        //  var lookupVar = new SP.FieldLookupValue();
        //  lookupVar.set_lookupId(TableId);
        // ListItem.set_item('TableId', lookupVar);

        ListItem.set_item('IndexName', obj[i].IndexName);
        //   ListItem.set_item('IndexDescription', obj[i].IndexDescription);
        ListItem.set_item('Items', obj[i].Items);
        ListItem.set_item('Unique', obj[i].Unique);
        ListItem.set_item('IsClustered', obj[i].IsClustered);
        ListItem.update();
        itemArray[i] = ListItem;

        clientContext.load(itemArray[i]);
    }
    clientContext.executeQueryAsync(onQuerySucceededIndex, onQueryFailed);
}
function onQuerySucceededIndex() {
    $('#divloader').addClass('hide');
    alert('Indexes submitted sucessfully!');



}
function onQueryFailed(sender, args) {
    $('#divloader').addClass('hide');
    alert('Request failed with error message - ' + args.get_message() + ' . Stack Trace - ' + args.get_stackTrace());
}

///////////////End Index/////////////////////////////////

///////////////////Utility///////////////////////////////
function setAktivMenu(ctrl, text) {

    $('#' + ctrl).val(text).html(function (i, html) {
        return text + html.slice(html.indexOf(' <'));
    });
}

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function getListItemById(itemId, listName, success, failure) {
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?$filter=ID eq " + itemId;
    $.ajax({
        url: url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            if (data.d.results.length == 1) {
                success(data.d.results[0]);
            }
            else {
                failure("Multiple results obtained for the specified Id value");
            }
        },
        error: function (data) {
            $('#divloader').addClass('hide');
            failure(data);
        }
    });
}
function FilterColumnsItemsByTableId1(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableColumns + "')/items?$select=*,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {
                BindColumnsTable(Items);
            } else {
                $('#loadingDiv').hide();
                $('#s4-workspace #tbColumn').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);
            $('#divloader').addClass('hide');
            alert(JSON.stringify(data));
        }
    });
}
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

function AddKeyWord() {
    debugger;
    var keyword = $('#btnaddKeyword').text();
    var url = $('#btnaddKeyword').attr('value');
    var data = $('#txtTableDescription').html();
    $('#txtTableDescription').html(data + ' <a target="_blank" href=' + url + ' style="cursor:pointer;" onclick=navigate("' + url + '");>' + keyword + '</a>');
}
function navigate(href) {
    debugger;
    console.log(href);
    window.location.href = href;
}

function DeleteRow(v) {
    if (confirm("Are you sure. You want to delete this row.")) {
        $(v).closest('tr').remove();
    }
}
///////////////////End Utility///////////////////////////////