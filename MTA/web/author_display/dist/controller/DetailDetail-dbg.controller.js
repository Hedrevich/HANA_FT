sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/mvc/Controller"
], function(JSONModel, Controller) {
  "use strict";

  return Controller.extend("author_display.controller.DetailDetail", {
    onInit: function() {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oModel = this.getOwnerComponent().getModel();

      this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onSupplierMatched, this);
    },
    handleAboutPress: function() {
      var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(3);
      this.oRouter.navTo("page2", {
        layout: oNextUIState.layout
      });
    },
    handleFullScreen: function() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/fullScreen");
      this.oRouter.navTo("detailDetail", {
        layout: sNextLayout,
        book: this._book
      });
    },
    handleExitFullScreen: function() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/exitFullScreen");
      this.oRouter.navTo("detailDetail", {
        layout: sNextLayout,
        book: this._book
      });
    },
    handleClose: function() {
      var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/closeColumn");
      this.oRouter.navTo("master", {
        layout: sNextLayout
      });
    },
    _onSupplierMatched: function(oEvent) {
      this._supplier = oEvent.getParameter("arguments").book || this._book || "0";
      this.getView().bindElement({
        path: "/" + this._supplier,
        model: "authors"
      });
    }
  });
}, true);
