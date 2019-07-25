var constants = {
    TableInfo: 'TableInfo',
    TableColumns: 'Table_Columns',
    TableIndex: 'Table_Index',
    TableObjects: 'Table_InterdependencyObjects',
    TableConstraints: 'Table_Constraints',
    TableDocuments: 'Table_Documents',
    TableParentEntities: 'Table_ParentEntities',
    Table_ChildEntities: 'Table_ChildEntities',
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

    constants.TableId = getParameterByName('Kid');
    getCurrentUser();

});

function hideDocument() {
    $('div#brdDocument').addClass('hide');
}
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
                alert("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);

            alert(data);
        }
    });
}


function BindTable(item) {


    var tableName = $(item)[0].TableName != null ? $(item)[0].TableName : '';
    var ID = $(item)[0].ID != null ? $(item)[0].ID : '';
    $('#txtTable').html(tableName);
    $('#divTable').html(tableName);
    var description = typeof $(item)[0].Description != null ? $(item)[0].Description : '';
    if (description != null && description != '' && description.length > 500) {
        $('#txtTableDescription').html(description.substr(0, 500) + '<span class="collapse" id="description">' + description.substr(500) + '</span> <a data-toggle="collapse" data-target="#description">More... &raquo;</a>');
    } else {
        $('#txtTableDescription').html($(item)[0].Description != null ? $(item)[0].Description : '');
    }

    var technicalNotes = typeof $(item)[0].TechnicalNotes != null ? $(item)[0].TechnicalNotes : '';
    if (technicalNotes != null && technicalNotes != '' && technicalNotes.length > 500) {
        $('#txtTechnicalNotes').html(technicalNotes.substr(0, 500) + '<span class="collapse" id="technicalNotes">' + technicalNotes.substr(500) + '</span> <a data-toggle="collapse" data-target="#technicalNotes">More... &raquo;</a>');
    } else {
        $('#txtTechnicalNotes').html($(item)[0].TechnicalNotes != null ? $(item)[0].TechnicalNotes : '');
    }

    var granularity = typeof $(item)[0].DataGranularity != null ? $(item)[0].DataGranularity : '';
    if (granularity != null && granularity != '' && granularity.length > 250) {
        $('#txtDataGranularity').html(granularity.substr(0, 250) + '<span class="collapse" id="granularity">' + granularity.substr(250) + '</span> <a data-toggle="collapse" data-target="#granularity">More... &raquo;</a>');
    } else {
        $('#txtDataGranularity').html($(item)[0].DataGranularity != null ? $(item)[0].DataGranularity : '');
    }


    var sApplication = typeof $(item)[0].DataSource != null ? $(item)[0].DataSource : '';
    if (sApplication != null && sApplication != '' && sApplication.length > 250) {
        $('#txtSourceApplication').html(sApplication.substr(0, 250) + '<span class="collapse" id="sApplication">' + sApplication.substr(250) + '</span> <a class="more" data-toggle="collapse" data-target="#sApplication">More... &raquo;</a>');
    } else {
        $('#txtSourceApplication').html($(item)[0].DataSource != null ? $(item)[0].DataSource : '');
    }


    var sql = $(item)[0].SQLScript != null ? $(item)[0].SQLScript : '';
    if (sql != null && sql != '' && sql.length > 250) {
        $('#txtSQL').html(sql.substr(0, 250) + '<span class="collapse" id="sqlSchema">' + sql.substr(250) + '</span> <a class="more" data-toggle="collapse" data-target="#sqlSchema">More... &raquo;</a>');
    } else {
        $('#txtSQL').html($(item)[0].SQLScript != null ? $(item)[0].SQLScript : '');
    }

    // $('#txtAssumptions').html($(item)[0].Assumptions != undefined ? $(item)[0].Assumptions : '');
    //  $('#txtSeeAlso').val($(item)[0].SeeAlso != undefined ? $(item)[0].SeeAlso : '');
    $('#txtTriggers').html($(item)[0].Triggers != null ? $(item)[0].Triggers : '');

    $('#txtObjectUsedToPopulate').html($(item)[0].ObjectUsed != null ? $(item)[0].ObjectUsed : '');
    $('#txtDataLoadFrequency').html($(item)[0].DataLoadFrequency != null ? $(item)[0].DataLoadFrequency : '');
    $('#txtDataLoadType').html($(item)[0].DataLoadType != null ? $(item)[0].DataLoadType : '');
    $('#txtSchemaName').html($(item)[0].SchemaName != null ? $(item)[0].SchemaName : '');
    $('#tblName').html(tableName);
    $('#lblTableCreationDate').html($(item)[0].CreationDate != null ? $(item)[0].CreationDate : '');
    $('#lblFileGroup').html($(item)[0].FileGroup != null ? $(item)[0].FileGroup : '');
    var SystemObject = $(item)[0].SystemObject != null && $(item)[0].SystemObject != null ? $(item)[0].SystemObject : false;
    if (SystemObject == true) {
        $('#chkSystemObject').attr('checked', SystemObject);
    }



    $('#lblRows').html($(item)[0].RowCount != null ? $(item)[0].RowCount : '');
    $('#lblDataSpaceUsed').html($(item)[0].DataSpace != null ? $(item)[0].DataSpace : '');
    // $('#lblIndexSpaceUsed').html($(item)[0].IndexSpaceUsed != undefined ? $(item)[0].IndexSpaceUsed : '');


    if ($(item)[0].Category != null && $(item)[0].Category != '') {
        //setAktivMenu('btnTableType',$(item)[0].TableType);
        $('#btnTableType').html($(item)[0].Category);
    }
    if ($(item)[0].Database != null && $(item)[0].Database != '') {
        //setAktivMenu('btnDatabase',$(item)[0].Database);
        $('#btnDatabase').html($(item)[0].Database);
    }
    if (typeof $(item)[0].TableName != null && $(item)[0].TableName != '') {
        FilterColumnsItemsByTableId(ID);//'Columns','Table',$(item)[0].Table
        GetFiltereIndexesItemByTableId(ID);
        // GetFiltereRelationsShipsItemByTableId(ID);
        GetFiltereObjectsItemByTableId(ID);
        FiltereConstraintsItemByTableId(ID);
        FiltereDocumentsByTableId(ID);
        GetParentEntityByTableId(ID);
        GetChildEntityByTableId(ID);
    }

}


$('div#Content_section').on("click", "a.more", function (e) { //user click on remove text
    debugger;   
    e.preventDefault();
    if ($(this).attr('aria-expanded') == null) {
        $(this).html('Less..&raquo;');
    }
        if ($(this).attr('aria-expanded')== "true") {
            $(this).html('More..&raquo;');
        }

        if ($(this).attr('aria-expanded') == "false") {
            $(this).html('More..&raquo;');
        }
   
});
//////////////End TableInfo//////////////////////////
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
            alert(JSON.stringify(data));
        }
    });
}
function BindLibraryMetadata(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var Name = $(this)[0].Name != undefined && $(this)[0].Name != null ? $(this)[0].Name : '';
        var ServerRelativeUrl = $(this)[0].ServerRelativeUrl != undefined && $(this)[0].ServerRelativeUrl != null ? $(this)[0].ServerRelativeUrl : '';



        sb.append('<tr id=' + $(this)[0].ID + '>'+       
            '<td><span>' + Name + '</span></td>'+
            '<td><a href=' + ServerRelativeUrl + '><span>' + Name + '</span></a></td>'+
            '</tr>');

    });
    $('#s4-workspace #tbDocuments').html(sb.toString());
    console.log(Items);

}
//////////////End Documents//////////////////////////
///////////////Columns/////////////////////////////////
function FilterColumnsItemsByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableColumns + "')/items?$select=ID,ColumnName,Description,Key_x0020__x0028_PK_x002f_FK_x00,DataType,Length,IsNull,Formula,Default_x0020_Value,SQLCode,DataSource,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
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
            alert(JSON.stringify(data));
        }
    });
}

function BindColumnsTable(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {
        /*var desc ;
        if($(this)[0].TableDescription != 'undefined'){

        desc =  $(this)[0].TableDescription.length > 25?$(this)[0].TableDescription.substring(0,25)+'...':$(this)[0].TableDescription;
        }else{
        desc = '';
        }*/
        var ColumnName = $(this)[0].ColumnName != undefined && $(this)[0].ColumnName != null ? $(this)[0].ColumnName : '';
        var ColumnDescription = $(this)[0].Description != undefined && $(this)[0].Description != null ? $(this)[0].Description : '';
        var DataType = $(this)[0].DataType != undefined && $(this)[0].DataType != null ? $(this)[0].DataType : '';
        var Length = $(this)[0].Length != undefined && $(this)[0].Length != null ? $(this)[0].Length : '';
        var Key = $(this)[0].Key_x0020__x0028_PK_x002f_FK_x00 != undefined && $(this)[0].Key_x0020__x0028_PK_x002f_FK_x00 != null ? $(this)[0].Key_x0020__x0028_PK_x002f_FK_x00 : '';
        var Nulls = $(this)[0].IsNull != undefined && $(this)[0].IsNull != null ? $(this)[0].IsNull : '';
        var Unique = $(this)[0].Unique != undefined && $(this)[0].Unique != null ? $(this)[0].Unique : '';
        var Formula = $(this)[0].Formula != undefined && $(this)[0].Formula != null ? $(this)[0].Formula : '';
        var Default = $(this)[0].Default_x0020_Value != undefined && $(this)[0].Default_x0020_Value != null ? $(this)[0].Default_x0020_Value : '';
        var Identity = $(this)[0].Identity != undefined && $(this)[0].Identity != null ? $(this)[0].Identity : '';
        var Seed = $(this)[0].Seed != undefined && $(this)[0].Seed != null ? $(this)[0].Seed : '';
        var Increment = $(this)[0].Increment != undefined && $(this)[0].Increment != null ? $(this)[0].Increment : '';
        var SQLCode = typeof $(this)[0].SQLCode != undefined && $(this)[0].SQLCode != null ? $(this)[0].SQLCode : '';
        var DataSource = $(this)[0].DataSource != undefined && $(this)[0].DataSource != null ? $(this)[0].DataSource : '';
        var FKEntity = $(this)[0].FKEntity != undefined && $(this)[0].FKEntity != null ? $(this)[0].FKEntity : '';
        var FKRelationship = $(this)[0].FKRelationship != undefined && $(this)[0].FKRelationship != null ? $(this)[0].FKRelationship : '';
        var FKColumn = $(this)[0].FKColumn != undefined && $(this)[0].FKColumn != null ? $(this)[0].FKColumn : '';

        var formulaMore = "";
        if (Formula != null && Formula != '' && Formula.length > 250) {
            formulaMore = Formula.substr(0, 250) + "<span class='collapse' id=formula" + index + 1 + ">" + Formula.substr(250) + "</span> <a data-toggle='collapse' data-target=#formula" + index + 1 + ">More... &raquo;</a>";
        } else {
            formulaMore = $(this)[0].Formula != undefined && $(this)[0].Formula != null ? $(this)[0].Formula : '';
        }

        var dataSourceMore = "";
        if (DataSource != '' && DataSource.length > 250) {
            dataSourceMore = DataSource.substr(0, 250) + "<span class='collapse' id=dataSource" + index + 1 + ">" + DataSource.substr(250) + "</span> <a data-toggle='collapse' data-target=#dataSource" + index + 1 + ">More... &raquo;</a>";
        } else {
            dataSourceMore = $(this)[0].DataSource != undefined && $(this)[0].DataSource != null ? $(this)[0].DataSource : '';
        }

        var sqlCodeMore = "";
        if (SQLCode != '' && SQLCode.length > 250) {
            sqlCodeMore = SQLCode.substr(0, 250) + "<span class='collapse' id=sqlCode" + index + 1 + ">" + SQLCode.substr(250) + "</span> <a data-toggle='collapse' data-target=#sqlCode" + index + 1 + ">More... &raquo;</a>";
        } else {
            sqlCodeMore = $(this)[0].SQLCode != undefined && $(this)[0].SQLCode != null ? $(this)[0].SQLCode : '';
        }
        sb.append("<tr id=" + $(this)[0].ID + ">" +
            "<td><span class='label label-default'>" + (index + 1) + "</span></td>" +
            "<td id='tdColumnName'><a id='anchColumnName' onclick='GetTableByID(" + $(this)[0].ID + ");' data-toggle='modal' data-target='#myModal' href='#'><span class='Pointer'>" + ColumnName + "</span></a></td>" +
            "<td class='descminspace'><span>" + ColumnDescription + "</span></td>" +
            "<td><span>" + DataType + "</span></td>" +
             "<td><span>" + Key + "</span></td>" +
            "<td><span>" + Length + "</span></td>" +
            "<td><span>" + Nulls + "</span></td>" +
            "<td><span>" + Unique + "</span></td>" +
            "<td><span>" + Default + "</span></td>" +
            "<td><span>" + Identity + "</span></td>" +
             "<td><span>" + Seed + "</span></td>" +
              "<td><span>" + Increment + "</span></td>" +
            
            "<td><pre class='pre-height'><span>" + formulaMore + "</span></pre></td>" +
            "<td><pre class='pre-height'><span>" + sqlCodeMore + "</span></pre></td>" +
            "<td><pre class='pre-height'<span>" + dataSourceMore + "</span></pre></td>" +
             "<td><span>" + FKEntity + "</span></td>" +
              "<td><span>" + FKRelationship + "</span></td>" +
               "<td><span>" + FKColumn + "</span></td>" +
            "</tr>");



    });
    $('#s4-workspace #tbColumn').html(sb.toString());
}

///////////////End Columns/////////////////////////////////
//////////////Constraints/////////////////////////
function FiltereConstraintsItemByTableId(ID) {

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

            alert(JSON.stringify(data));
        }
    });
}
function BindTableConstraints(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var ConstraintName = $(this)[0].ConstraintName != undefined && $(this)[0].ConstraintName != null ? $(this)[0].ConstraintName : '';
        var Caption = $(this)[0].Caption != undefined && $(this)[0].Caption != null ? $(this)[0].Caption : '';



        sb.append('<tr id=' + $(this)[0].ID + '> <td><span class="label label-default">' + (index + 1) + '</span></td><td><a data-toggle="modal" data-target="#myModalObject" onclick="GetObjectItemById(' + $(this)[0].ID + ')" href="#"><span class="Pointer">' + ConstraintName + '</span></a></td><td><span>' + Caption + '</span></td></tr>');

    });
    $('#s4-workspace #tbConstraint').html(sb.toString());
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

            alert(JSON.stringify(data));
        }
    });
}
function BindObjectsTable(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var Object = $(this)[0].ObjectName != undefined && $(this)[0].ObjectName != null ? $(this)[0].ObjectName : '';
        var ObjectDescription = $(this)[0].ObjectDescription != undefined && $(this)[0].ObjectDescription != null ? $(this)[0].ObjectDescription : '';
        var ObjectType = $(this)[0].ObjectType != undefined && $(this)[0].ObjectType != null ? $(this)[0].ObjectType : '';
        var ObjectLocation = $(this)[0].ObjectLocation != undefined && $(this)[0].ObjectLocation != null ? $(this)[0].ObjectLocation : '';


        sb.append('<tr id=' + $(this)[0].ID + '> <td><span class="label label-default">' + (index + 1) + '</span></td><td><a id="anchColumnName"  data-toggle="modal" data-target="#myModalObject" onclick="GetObjectItemById(' + $(this)[0].ID + ')" href="#"><span class="Pointer">' + Object + '</span></a></td><td><span>' + ObjectDescription + '</span></td><td><span>' + ObjectType + '</span></td><td><span>' + ObjectLocation + '</span></td></tr>');

    });
    $('#s4-workspace #tbObject').html(sb.toString());
}

//////////////End Objects/////////////////////////
///////////////Index/////////////////////////////////
function GetFiltereIndexesItemByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableIndex + "')/items?$select=ID,IndexName,IndexDescription,Unique,Items,IsClustered,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
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

            alert(JSON.stringify(data));
        }
    });
}
function BindIndexTable(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var Index = $(this)[0].IndexName != null && $(this)[0].IndexName != null ? $(this)[0].IndexName : '';
        var Items = $(this)[0].Items != null && $(this)[0].Items != null ? $(this)[0].Items : '';
        //  var Primary = $(this)[0].Primary != undefined && $(this)[0].Primary != null ? $(this)[0].Primary : false;
        var Unique = $(this)[0].Unique != null && $(this)[0].Unique != null ? $(this)[0].Unique == true ? 'Yes':'No' : '';
        var IsClustered = $(this)[0].IsClustered != null && $(this)[0].IsClustered != null ? $(this)[0].IsClustered == true ? 'Yes' : 'No' : '';
       // var Items = $(this)[0].Items != null && $(this)[0].Items != null ? $(this)[0].Items : '';

        sb.append("<tr id='+ $(this)[0].ID +'><td><span class='label label-default'>" + (index + 1) + "</span></td>" +
            "<td><a id='anchColumnName' onclick='GetIndexByID(" + $(this)[0].ID + ");' data-toggle='modal' data-target='#myModalIndex'  href='#'><span class='Pointer'>" + Index + "</span></a></td>" +
            "<td><span>" + Unique + "</span> </td>" +
            "<td><span>" + IsClustered + "</span></td>" +
            "<td><Pre><span id='txtItems'>" + Items + "</span></Pre></td>" +
            "</tr>");



    });
    $('#s4-workspace #tbIndex').html(sb.toString());

}
///////////////End Index/////////////////////////////////

///////////////Parent Entity/////////////////////////////////
function GetParentEntityByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.TableParentEntities + "')/items?$select=ID,ParentEntityName,ObjectType,Attributes,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {

                BindParentEntity(Items);
            } else {
                //   $('#loadingDiv').hide();
                $('#s4-workspace #tbIndex').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);

            alert(JSON.stringify(data));
        }
    });
}
function BindParentEntity(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var ParentEntityName = $(this)[0].ParentEntityName != null && $(this)[0].ParentEntityName != null ? $(this)[0].ParentEntityName : '';
        var ObjectType = $(this)[0].ObjectType != null && $(this)[0].ObjectType != null ? $(this)[0].ObjectType : '';
        var Attributes = $(this)[0].Attributes != null && $(this)[0].Attributes != null ? $(this)[0].Attributes : '';
        


        sb.append("<tr id='+ $(this)[0].ID +'><td><span class='label label-default'>" + (index + 1) + "</span></td>" +
            "<td><a onclick='GetParentEntityByID(" + $(this)[0].ID + ");' data-toggle='modal' data-target='#myModalIndex'  href='#'><span class='Pointer'>" + ParentEntityName + "</span></a></td>" +
            "<td><span>" + ObjectType + "</span></td>" +
            "<td><span>" + Attributes + "</span></td>" +

            "</tr>");
        //sb.append(sb);


    });
    $('#s4-workspace #tbParentRelationship').html(sb.toString());

}
///////////////End Parent Entity/////////////////////////////////
///////////////Parent Entity/////////////////////////////////
function GetChildEntityByTableId(ID) {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + constants.Table_ChildEntities + "')/items?$select=ID,ChildEntityName,ObjectType,Attributes,TableId/ID&$expand=TableId/ID&$filter=TableId eq '" + ID + "'",
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data, textStatus, jqXHR) {
            //Get Columns List
            var Items = data.d.results;
            if (Items.length > 0) {

                BindChildEntity(Items);
            } else {
                //   $('#loadingDiv').hide();
                $('#s4-workspace #tbIndex').html("No Records Found!!");
            }
        },
        error: function (data) {
            debugger;
            console.log(data);

            alert(JSON.stringify(data));
        }
    });
}
function BindChildEntity(Items) {

    var sb = new StringBuilder();
    $(Items).each(function (index) {

        var ChildEntityName = $(this)[0].ChildEntityName != undefined && $(this)[0].ChildEntityName != null ? $(this)[0].ChildEntityName : '';
        var ObjectType = $(this)[0].ObjectType != undefined && $(this)[0].ObjectType != null ? $(this)[0].ObjectType : '';
        var Attributes = $(this)[0].Attributes != null && $(this)[0].Attributes != null ? $(this)[0].Attributes : '';


        sb.append("<tr id='+ $(this)[0].ID +'><td><span class='label label-default'>" + (index + 1) + "</span></td>" +
            "<td ><a onclick='GetParentEntityByID(" + $(this)[0].ID + ");' data-toggle='modal' data-target='#myModalIndex'  href='#'><span class='Pointer'>" + ChildEntityName + "</span></a></td>" +
            "<td><span>" + ObjectType + "</span></td>" +
            "<td><span>" + Attributes + "</span></td>" +

            "</tr>");
        //sb.append(sb);


    });
    $('#s4-workspace #tbChildRelationship').html(sb.toString());

}
///////////////End Parent Entity/////////////////////////////////

///////////////////Utility///////////////////////////////
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
            failure(data);
        }
    });
}
function FilterColumnsItemsByTableId(ID) {

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



///////////////////End Utility///////////////////////////////