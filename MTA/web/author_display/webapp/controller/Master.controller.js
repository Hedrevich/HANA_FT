sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter",
  "sap/ui/core/Fragment"
], function(JSONModel, Controller, Filter, FilterOperator, Sorter, Fragment) {
  "use strict";

  return Controller.extend("author_display.controller.Master", {

    onInit: function() {
      this.oRouter = this.getOwnerComponent().getRouter();
      this._bDescendingSort = false;
    },

    createAuthor: function() {
      var sName = this.getView().getModel("config").getProperty("/newAuthorNameInput/value");

      function successHandler(data) {
        oModel.refresh(true);
        console.log("Created");
        console.log(data);

        oAddress.author_id = data.author_id;

        $.ajax({
          url: sAddressURI,
          type: 'POST',
          data: JSON.stringify(oAddress),
          success: null,
          error: null
        });
      }

      function errorHandler(error) {
        console.error("Error creating");
        console.error(error);
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
        var oModel = this.getView().getModel("authors");
        var sAddressURI = this.getView().getModel("config").getProperty("/addressURI");

        var oAuthor = {
          name: sName
        };

        oModel.create("/Authors", oAuthor, {
          success: successHandler,
          error: errorHandler
        });

        var oAddress = {
          city: this.getView().getModel("config").getProperty("/newAddressCity/value"),
          strt: this.getView().getModel("config").getProperty("/newAddressStreet/value"),
          hnum: this.getView().getModel("config").getProperty("/newAddressHome/value")
        }

      }

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


    onListItemPress: function(oEvent) {
      var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
        authorPath = oEvent.getSource().getBindingContext("authors").getPath(),
        author = authorPath.split("/").slice(-1).pop();
      this.oRouter.navTo("detail", {
        layout: oNextUIState.layout,
        author: author
      });
    },


    onSearch: function(oEvent) {
      var oTableSearchState = [],
        sQuery = oEvent.getParameter("query");

      if (sQuery && sQuery.length > 0) {
        oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
      }

      this.getView().byId("authorsTable").getBinding("items").filter(oTableSearchState, "Application");
    },


    onSort: function(oEvent) {
      this._bDescendingSort = !this._bDescendingSort;
      var oView = this.getView(),
        oTable = oView.byId("authorsTable"),
        oBinding = oTable.getBinding("items"),
        oSorter = new Sorter("name", this._bDescendingSort);

      oBinding.sort(oSorter);
    },


    onUpdateFinished: function(oEvent) {

      var oTable = oEvent.getSource(),
        iTotalItems = oEvent.getParameter("total");
      var sTitle = this.getView().getModel("i18n").getResourceBundle().getText("authorsTitle");
      if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
        sTitle = sTitle + "(" + iTotalItems + ")";
      }
      this.getView().getModel("config").setProperty("/authorsTableTitle/value", sTitle);
    }
  });
}, true);
