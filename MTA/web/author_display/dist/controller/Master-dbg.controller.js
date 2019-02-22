sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("author_display.controller.Master", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;
		},
		onListItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				authorPath = oEvent.getSource().getBindingContext("authors").getPath(),
				author = authorPath.split("/").slice(-1).pop();
			// var author_id = author.substr(-7).slice(-1);

			// this.oRouter.navTo("detail", {layout: oNextUIState.layout, author: author, author_id: author_id});
			this.oRouter.navTo("detail", {layout: oNextUIState.layout, author: author});
		},
		
		//works
		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
			}

			this.getView().byId("authorsTable").getBinding("items").filter(oTableSearchState, "Application");
		},

		
		onAdd: function (oEvent) {
			MessageBox.show("This functionality is not ready yet.", {
				icon: MessageBox.Icon.INFORMATION,
				title: "Aw, Snap!",
				actions: [MessageBox.Action.OK]
			});
		},

		//works
		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("authorsTable"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("name", this._bDescendingSort);

			oBinding.sort(oSorter);
		}
	});
}, true);
