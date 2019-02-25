const Address = $.import('xsjs.address', 'address').Address;

const PREFIX = "HiMTA::";
const TABLE_NAME = "ExtraInfo.Address";

const address = new Address(
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
            address.doPost(JSON.parse($.request.body.asString()));
            break;
          }
        case $.net.http.DEL:
          {
            address.doDelete($.request.parameters.get("author_id"));
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
