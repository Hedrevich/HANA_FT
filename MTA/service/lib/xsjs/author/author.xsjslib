var PreparedStatementLib = $.import('xsjs', 'preparedStatement').lib;

var Author = function(connection, prefix, tableName) {

  const sPREFIX = prefix;
  const sTABLE_NAME = prefix + tableName;

  //OK
  this.doPost = function(oAuthor) {

    $.trace.error("oAuthor:   " + JSON.stringify(oAuthor));
    //Get Next ID Number
    oAuthor.author_id = getNextval(`${sPREFIX}author_id`);

    //generate query
    const statement = PreparedStatementLib.createPreparedInsertStatement(sTABLE_NAME, oAuthor);

    //execute update
    connection.executeUpdate(statement.sql, statement.aValues);
    connection.commit();

    $.response.status = $.net.http.CREATED;
    $.response.setBody(JSON.stringify(oAuthor));
  };

  //OK
  this.doPut = function(oAuthor) {
    //generate query
    let oResult = {
      aParams: [],
      aValues: [],
      sql: "",
    };

    oResult.sql = `UPDATE "${sTABLE_NAME}" SET "name"='${oAuthor.name}' WHERE "author_id"=${oAuthor.author_id};`;

    $.trace.error("sql to update: " + oResult.sql);

    //execute update
    connection.executeUpdate(oResult.sql, oResult.aValues);
    connection.commit();

    $.response.status = $.net.http.OK;
    $.response.setBody(JSON.stringify(oAuthor));
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
    const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;

    const result = connection.executeQuery(statement);

    if (result.length > 0) {
      $.trace.error("ID: " + result[0].ID);
      return result[0].ID;
    } else {
      throw new Error('ID was not generated');
    }
  }

};
