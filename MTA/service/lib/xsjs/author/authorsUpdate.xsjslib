var JsonFormatter = $.import('xsjs', 'JsonFormatter').formatter;

const sTABLE_NAME = "HiMTA::Author";

function authorsUpdate(param) {

  $.trace.error(JSON.stringify(param));
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");

  var oResult = pStmt.executeQuery();

  var oAuhtorItems = JsonFormatter.recordSetToJSON(oResult, "items");

  var oAuthor = oAuhtorItems.items[0];
  $.trace.error(JSON.stringify(oAuthor));

  pStmt = param.connection.prepareStatement(`UPDATE \"${sTABLE_NAME}\" SET \"name\"=?, \"updated\"=? WHERE \"author_id\"=?`);
  pStmt.setString(1, oAuthor.name.toString());
  pStmt.setTimestamp(2, new Date());
  pStmt.setString(3, oAuthor.author_id.toString());
  pStmt.executeUpdate();
  pStmt.close();
}
