sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller"
], function(JSONModel, Controller) {
  "use strict";

  return Controller.extend("author_display.controller.Detail", {

    onInit: function() {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oModel = this.getOwnerComponent().getModel();

      this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
      this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
      this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
    },

    handleItemPress: function(oEvent) {
      var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2),
        bookPath = oEvent.getSource().getBindingContext("authors").getPath(),
        book = bookPath.split("/").slice(-1).pop();

      this.oRouter.navTo("detailDetail", {
        layout: oNextUIState.layout,
        book: book
      });
    },

    handleFullScreen: function() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
      this.oRouter.navTo("detail", {
        layout: sNextLayout,
        author: this._author
      });
    },

    handleExitFullScreen: function() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
      this.oRouter.navTo("detail", {
        layout: sNextLayout,
        author: this._author
      });
    },

    handleClose: function() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
      this.oRouter.navTo("master", {
        layout: sNextLayout
      });
    },

    _onProductMatched: function(oEvent) {
      this._author = oEvent.getParameter("arguments").author || this._author || "0";
      this.getView().bindElement({
        path: "/" + this._author,
        model: "authors",
        parameters: {
          expand: "toBooks,toAddress"
        },
      });
    },

    //works
    onDelete: function() {

      function successHandler(data) {
        console.log(data);
        oModel.refresh();
        console.log("deleted successfully");
      }

      function errorHandler(error) {
        console.log(error);
        console.log("deleted ERROR!");
      }

      var oModel = this.getView().getModel("authors");
      var sPath = this.getView().getElementBinding('authors').sPath;
      var sId = sPath.slice(-6).substring(0, 4);


      $.ajax({
        url: 'https://p2001079359trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsjs/author/author.xsjs/author.xsjs?author_id=' + sId,
        type: 'DELETE',
        success: successHandler,
        error: errorHandler
      });
    },

  ///// FIXME:
    onEdit: function() {
      var editBtn = this.getView().byId("editBtn");
      editBtn.setEnabled(false);
//// FIXME:
      var authorNameText = this.getView().byId("authorNameText");
      authorNameText.setEnabled(true);
      authorNameText.focus();
    },


    onAuthorNameSubmit: function() {

      function successHandler(data) {
        console.log(data);
        console.log("updated successfully");
      }

      function errorHandler(error) {
        console.log(error);
        console.log("updating ERROR!");
      }

//FIXME
      var authorNameText = this.getView().byId("authorNameText");
      authorNameText.setEnabled(false);

      var oModel = this.getView().getModel("authors");
      oModel.sDefaultUpdateMethod = "PUT";
      var sName = authorNameText.getValue();
      var sPath = this.getView().getElementBinding('authors').sPath;


      var oData = {
        name: sName,
        created: new Date(),
        updated: new Date()
      };

      oModel.update(sPath, oData, {
        success: successHandler,
        error: errorHandler
      });
//// FIXME: 
      var editBtn = this.getView().byId("editBtn");
      editBtn.setEnabled(true);
    }
  });
}, true);
