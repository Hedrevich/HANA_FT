sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment"
], function(JSONModel, Controller, Fragment) {
  "use strict";

  return Controller.extend("author_display.controller.Detail", {

    onInit: function() {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oModel = this.getOwnerComponent().getModel();

      this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
      this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
    },

    handleItemPress: function(oEvent) {
      var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2),
        bookPath = oEvent.getSource().getBindingContext("authors").getPath(),
        book = bookPath.split("/").slice(-1).pop();
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


    onDelete: function() {

      function successHandler(data) {
        console.log(data);
        oModel.refresh();
        console.log("deleted successfully");
      }

      function errorHandler(error) {
        console.error(error);
        console.error("deleted ERROR!");
      }

      var oModel = this.getView().getModel("authors");
      var sPath = this.getView().getElementBinding('authors').sPath;
      var sId = sPath.slice(-6).substring(0, 4);


      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
      this.oRouter.navTo("master", {
        layout: sNextLayout
      });


      var sAuthorURI = this.getView().getModel("config").getProperty("/authorURI");
      $.ajax({
        url: sAuthorURI + '?author_id=' + sId,
        type: 'DELETE',
        success: successHandler,
        error: errorHandler
      });
    },


    onEdit: function() {

      this.getView().getModel("model").setProperty("/editBtn/enabled", false);
      this.getView().getModel("model").setProperty("/authorNameInput/enabled", true);
    },


    onAuthorNameSubmit: function() {

      function successHandler(data) {
        console.log(data);
        console.log("updated successfully");
      }

      function errorHandler(error) {
        console.error(error);
        console.error("updating ERROR!");
      }


      var authorNameText = this.getView().byId("authorNameText");
      this.getView().getModel("model").setProperty("/authorNameInput/enabled", false);

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
      this.getView().getModel("model").setProperty("/editBtn/enabled", true);

    },

    createBook: function() {
      var sName = this.getView().byId("newBookName").getValue();

      function successHandler(data) {
        oModel.refresh(true);
        console.log("Created book");
        console.log(data);
      }

      function errorHandler(error) {
        console.error("Error creating book");
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
        var sBookURI = this.getView().getModel("config").getProperty("/bookURI");
        var sPath = this.getView().getElementBinding('authors').sPath;
        var sId = sPath.slice(-6).substring(0, 4);

        var oBook = {
          author_id: sId,
          name: this.getView().getModel("config").getProperty("/newBookName/value")
        };

        $.ajax({
          url: sBookURI,
          type: 'POST',
          data: JSON.stringify(oBook),
          success: successHandler,
          error: errorHandler
        });

      }

      this.byId("bookDialog").close();
    },


    onAdd: function() {
      var oView = this.getView();
      if (!this.byId("bookDialog")) {
        Fragment.load({
          id: oView.getId(),
          name: "author_display.fragment.DialogBook",
          controller: this
        }).then(function(oDialog) {
          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("bookDialog").open();
      }
    },

    closeDialog: function() {
      this.getView().byId("bookDialog").close();
    },
  });
}, true);
