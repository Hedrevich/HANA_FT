const Book = $.import('xsjs.book', 'book').Book;

const PREFIX = "HiMTA::";
const TABLE_NAME = "ExtraInfo.Book";

const book = new Book(
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
        case $.net.http.POST:
          {
            book.doPost(JSON.parse($.request.body.asString()));
            break;
          }
        case $.net.http.DEL:
          {
            book.doDelete($.request.parameters.get("author_id"));
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
