sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("jsonbinding.controller.JSONBinding", {

        onInit: function () {
        },

        onSelectionChange: function (oEvent) {

            var oSelectedItem = oEvent.getParameter("listItem");

            if (!oSelectedItem) {
                return;
            }

            var oContext = oSelectedItem.getBindingContext("ProductsModel");

            if (!oContext) {
                return;
            }

            var oData = oContext.getObject();

            console.log("Selected Product:", oData);

            // OPTIONAL: directly bind selected context to panel 3
            this.getView().byId("panel3").setBindingContext(oContext, "ProductsModel");

        }

    });
});