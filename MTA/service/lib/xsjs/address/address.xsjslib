var PreparedStatementLib = $.import('xsjs', 'preparedStatement').lib;

var Address = function(connection, prefix, tableName) {

  const sPREFIX = prefix;
  const sTABLE_NAME = prefix + tableName;

  //OK
  this.doPost = function(oAddress) {

    $.trace.error("oAddress:   " + JSON.stringify(oAddress));

    //generate query
    const statement = PreparedStatementLib.createPreparedInsertStatement(sTABLE_NAME, oAddress);

    //execute update
    connection.executeUpdate(statement.sql, statement.aValues);
    connection.commit();

    $.response.status = $.net.http.CREATED;
    $.response.setBody(JSON.stringify(oAddress));
  };

  //OK
  this.doDelete = function(author_id) {
    const statement = PreparedStatementLib.createPreparedDeleteStatement(sTABLE_NAME, {
      author_id: author_id
    });
    connection.executeUpdate(statement.sql, statement.aValues);

    connection.commit();
    $.response.status = $.net.http.OK;
    $.response.setBody(JSON.stringify({}));
  };

};
