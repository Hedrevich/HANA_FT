sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller) {
	"use strict";

	return Controller.extend("author_create.controller.App", {
        onInit: function () {

		},

        createauthor: function () {
            var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();

            $.ajax({
                type: "POST",
				crossDomain: true,
				url: "https://p2001079359trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Authors",
				headers: {
					"content-type": "application/json"
				},
				data: "{\"name\": \"" + Name  + "\"}"
              });
		}
    });
});
