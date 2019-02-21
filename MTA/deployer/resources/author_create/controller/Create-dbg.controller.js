sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("author_create.controller.Create", {
        onInit: function () {
		},
		createauthor: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			console.log(Name);
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001079359trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Authors",
				"method": "POST",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\"}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		}
     });

});
