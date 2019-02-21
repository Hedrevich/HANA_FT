sap.ui.define([
    "author_display/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("author_display.controller.App", {
        listFactory: function (sId) {
            var oUIControl;

            oUIControl = this.byId("item").clone(sId);
            console.log(sId);
            return oUIControl;
        },
        goToDetails: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var context = encodeURIComponent(oSelectedItem.getBindingContext('authors').getPath());
            console.log(context);
            this.getRouter().navTo("details", {
                id: context
            });
        }
    });
});
