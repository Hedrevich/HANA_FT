var PreparedStatementLib = $.import('xsjs', 'preparedStatement').lib;

var Book = function(connection, prefix, tableName) {

  const sPREFIX = prefix;
  const sTABLE_NAME = prefix + tableName;

  //OK
  this.doPost = function(oBook) {

    $.trace.error("oBook:   " + JSON.stringify(oBook));
    //Get Next ID Number
    oBook.book_id = getNextval(`${sPREFIX}book_id`);

    //generate query
    const statement = PreparedStatementLib.createPreparedInsertStatement(sTABLE_NAME, oBook);

    //execute update
    connection.executeUpdate(statement.sql, statement.aValues);
    connection.commit();

    $.response.status = $.net.http.CREATED;
    $.response.setBody(JSON.stringify(oBook));
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

  //OK
  function getNextval(sSeqName) {
    const statement = `select "${sSeqName}".NEXTVAL as "bookID" from dummy`;

    const result = connection.executeQuery(statement);

    if (result.length > 0) {
      $.trace.error("ID: " + result[0].bookID);
      return result[0].bookID;
    } else {
      throw new Error('ID was not generated');
    }
  }

};
