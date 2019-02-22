sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
    "sap/ui/core/Fragment"
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, Fragment) {
	"use strict";

	return Controller.extend("author_display.controller.Master", {

	    onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;
        },

        createAuthor: function() {
            var sName = this.getView().byId("newAuthorNameInput").getValue();

            function successHandler(){
                oTable.getModel("authors").refresh(true);
            }

            function errorHandler(){
                //
            }

            if (!sName) {
                var dialog = new sap.m.Dialog({
                    title: 'Error',
                    type: 'Message',
                    state: 'Error',
                    content: new sap.m.Text({
                        text: 'Enter all necessarry field'
                    }),
                    beginButton: new sap.m.Button({
                        text: 'OK',
                        press: function() {
                            dialog.close();
                        }
                    }),
                    afterClose: function() {
                        dialog.destroy();
                    }
                });

                dialog.open();
            } else {
                var oTable = this.getView().byId('authorsTable');

                var oData = {
                    name: sName
                };

                oTable.getModel("authors").create("/Authors", oData, {
                    success: successHandler,
                    error: errorHandler
                });
            };

            this.byId("createDialog").close();
        },

        onAdd: function() {
            var oView = this.getView();
            if (!this.byId("createDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "author_display.fragment.Dialog",
                    controller: this
                }).then(function(oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("createDialog").open();
            }
        },

        closeDialog: function() {
            this.getView().byId("createDialog").close();
        },

        //works
		onListItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				authorPath = oEvent.getSource().getBindingContext("authors").getPath(),
				author = authorPath.split("/").slice(-1).pop();
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

		//works
		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("authorsTable"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("name", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

        //works
        onUpdateFinished: function (oEvent) {
            // update the worklist's object counter after the table update
            var sTitle,
                oTable = oEvent.getSource(),
                iTotalItems = oEvent.getParameter("total");
            // only update the counter if the length is final and
            // the table is not empty
            if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                sTitle = 'Authors(' + iTotalItems + ')';
            } else {
                sTitle = "Authors";
            }
            this.getView().byId("authorsTableTitle").setText(sTitle);
        }
	});
}, true);
