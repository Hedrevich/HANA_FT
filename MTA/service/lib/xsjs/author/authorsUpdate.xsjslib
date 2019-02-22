var JsonFormatter = $.import('xsjs', 'JsonFormatter').formatter;

const sTABLE_NAME = "HiMTA::Author";

function authorsUpdate(param) {
    var after = param.afterTableName;

    var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
    var oResult = pStmt.executeQuery();

    var oAuhtorItems = JsonFormatter.recordSetToJSON(oResult, "items");
    var oAuthor = oAuhtorItems.items[0];
    $.trace.error(JSON.stringify(oAuthor));

    var uStmt;
    uStmt = param.connection.prepareStatement(`UPDATE "${sTABLE_NAME}" SET "name"='${oAuthor.name}' WHERE "author_id"='${oAuthor.author_id}';`);
    uStmt.executeUpdate();
}