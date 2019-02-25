const Author = $.import('xsjs.author', 'author').Author;

const PREFIX = "HiMTA::";
const TABLE_NAME = "Author";

const authors = new Author(
  $.hdb.getConnection({
    treatDateAsUTC: true
  }),
  PREFIX,
  TABLE_NAME
);

(function() {
  (function handleRequest() {
    try {
      switch ($.request.method) {
        case $.net.http.PUT:
          {
            authors.doPut(JSON.parse($.request.body.asString()));
            break;
          }
        case $.net.http.POST:
          {
            authors.doPost(JSON.parse($.request.body.asString()));
            break;
          }
        case $.net.http.DEL:
          {
            authors.doDelete($.request.parameters.get("author_id"));
            break;
          }
        default:
          {
            $.response.status = $.net.http.METHOD_NOT_ALLOWED;
            break;
          }
      }
    } catch (e) {
      $.response.status = $.net.http.BAD_REQUEST;
      $.response.setBody(e.message);
    }
  }());
}());
