sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  'sap/ui/model/Sorter',
  'sap/m/MessageBox',
  "sap/ui/core/Fragment"
], function(JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, Fragment) {
  "use strict";

  return Controller.extend("author_display.controller.Master", {
      onInit: function() {
        this.oRouter = this.getOwnerComponent().getRouter();
        this._bDescendingSort = false;
      },
      createAuthor: function() {
        var Name = this.getbyId("newAuthorNameInput").getValue();
        if (!Name) {
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
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://p2001079359trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/himta.xsodata/Authors",
            "method": "POST",
            "headers": {
              "content-type": "application/json"
            },
            "processData": false,
            "data": "{\"name\": \"" + Name + "\""
          }
        };
        $.ajax(settings).done(function(response) {
          console.log(response);
          oTable.getModel("authors").refresh(true);
        });
        this.byId("createDialog").close();
      },
    closeDialog: function() {
      this.getView().byId("createDialog").close();
    },
    onAdd: function() {
      var oView = this.getView();
      if (!this.byId("createDialog")) {
        Fragment.load({
          id: oView.getId(),
          name: "author_display.view.Dialog",
          controller: this
        }).then(function(oDialog) {
          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("createDialog").open();
      }
    },
    onListItemPress: function(oEvent) {
      var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
        authorPath = oEvent.getSource().getBindingContext("authors").getPath(),
        author = authorPath.split("/").slice(-1).pop();
      // var author_id = author.substr(-7).slice(-1);

      // this.oRouter.navTo("detail", {layout: oNextUIState.layout, author: author, author_id: author_id});
      this.oRouter.navTo("detail", {
        layout: oNextUIState.layout,
        author: author
      });
    },

    //works
    onSearch: function(oEvent) {
      var oTableSearchState = [],
        sQuery = oEvent.getParameter("query");

      if (sQuery && sQuery.length > 0) {
        oTableSearchState = [new Filter("name", FilterOperator.Contains, sQuery)];
      }

      this.getView().byId("authorsTable").getBinding("items").filter(oTableSearchState, "Application");
    },
    //works
    onSort: function(oEvent) {
      this._bDescendingSort = !this._bDescendingSort;
      var oView = this.getView(),
        oTable = oView.byId("authorsTable"),
        oBinding = oTable.getBinding("items"),
        oSorter = new Sorter("name", this._bDescendingSort);

      oBinding.sort(oSorter);
    }
  });
}, true);
