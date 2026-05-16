sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "jsonbinding/model/formatter",
  "sap/m/MessageToast"
], function (Controller, formatter, MessageToast) {
  "use strict";

  return Controller.extend("jsonbinding.controller.JSONBinding", {
    formatter: formatter,

    onInit: function () {
      // Optional init logic
    },

    onSelectionChange: function (oEvent) {
      // Works across UI5 versions/controls: List uses "listItem" or "selectedItem"
      var oItem = oEvent.getParameter("listItem") || oEvent.getParameter("selectedItem");
      if (!oItem) {
        return;
      }

      // Make sure we get the binding context for the correct named model
      var oCtx = oItem.getBindingContext("ProductsModel");
      if (!oCtx) {
        // Fallback: try default model context (if you accidentally bound without model name)
        oCtx = oItem.getBindingContext();
      }
      if (!oCtx) {
        return;
      }

      var oData = oCtx.getObject();
      var oModel = this.getView().getModel("ProductsModel");
      if (!oModel) {
        return;
      }

      // Store selected item back in same model
      oModel.setProperty("/SelectedProduct", oData);
    },

    onEidSearch: function (oEvent) {
      // liveChange uses "value"
      var sEid = oEvent.getParameter("value");
      sEid = (sEid || "").trim();
      var oModel = this.getView().getModel("EmployeesModel");
      if (!oModel) {
        return;
      }

      if (!sEid) {
        oModel.setProperty("/SelectedEmployee", null);
        return;
      }

      var aEmployees = oModel.getProperty("/Employees") || [];

      // Match as string to handle numeric/string Eid in JSON
      var oMatch = aEmployees.find(function (emp) {
        return emp && String(emp.Eid) === String(sEid);
      });

      oModel.setProperty("/SelectedEmployee", oMatch || null);
    },

    onEnableChange: function (oEvent) {
      var bSelected = oEvent.getParameter("selected");

      var oModel = this.getView().getModel("EmployeesModel");
      if (oModel) {
        oModel.setProperty("/Enabled", bSelected);
      }

      // Optional feedback
      // MessageToast.show("Enabled: " + bSelected);
    }
  });
});