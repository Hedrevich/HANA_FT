var JsonFormatter = $.import('xsjs', 'JsonFormatter').formatter;

const sTABLE_NAME = "HiMTA::Author";

function authorsUpdate(param) {
    //get table name
    $.trace.error(JSON.stringify(param));
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oAuhtorItems = JsonFormatter.recordSetToJSON(oResult, "items");
    var oAuthor = oAuhtorItems.items[0];
    $.trace.error(JSON.stringify(oAuthor));

    // var date = new Date();
    // pStmt = param.connection.prepareStatement(`UPDATE \"${sTABLE_NAME}\" SET "name"='${oAuthor.name}', "updated"=${new Date()} WHERE "author_id"='${oAuthor.author_id}'`);
    pStmt = param.connection.prepareStatement(`UPDATE \"${sTABLE_NAME}\" SET \"name\"=?, \"updated\"=? WHERE \"author_id\"=?`);
    pStmt.setString(1, oAuthor.name.toString());
    pStmt.setDate(2, new Date());
    pStmt.setString(3, oAuthor.author_id.toString());
    pStmt.executeUpdate();
    pStmt.close();
}
