//oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;
var JsonFormatter = $.import('xsjs', 'JsonFormatter').formatter;

const sTABLE_NAME = "HiMTA::Author";

function authorsDelete(param) {
  //get table name
  $.trace.error(JSON.stringify(param));
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();

  var oAuhtorItems = JsonFormatter.recordSetToJSON(oResult, "items");
  var oAuthor = oAuhtorItems.items[0];
  $.trace.error(JSON.stringify(oAuthor));

  //DELETE messages , usersmessages  FROM messages  INNER JOIN usersmessages
  // WHERE messages.messageid= usersmessages.messageid and messages.messageid = '1'
  pStmt = param.connection.prepareStatement(`DELETE FROM \"${sTABLE_NAME}\" WHERE \"author_id\"=?`);
  pStmt.setString(1, oAuthor.author_id.toString());
  pStmt.executeUpdate();
  pStmt.close();
}
