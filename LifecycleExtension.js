sap.ui.define([
    "sap/dm/dme/podfoundation/extension/PluginControllerExtension",
    "sap/ui/core/mvc/OverrideExecution",
    "sap/dm/dme/podfoundation/controller/extensions/LifecycleExtensionConstants",
	"sap/ui/model/json/JSONModel",
    "sap/dm/dme/podfoundation/util/PodUtility"
], function (PluginControllerExtension, OverrideExecution, LifecycleConstants, JSONModel, PodUtility) {
    "use strict";

    return PluginControllerExtension.extend("rits.custom.plugin.operationpodselection.operationPodSelectionExtensionProvider.LifecycleExtension", {
        constructor: function (oExtensionUtilities, oExtensionUtility) {
            this._oExtensionUtilities = oExtensionUtilities;
            this._oExtensionUtility = oExtensionUtility;
            this._bInitialized = false;
        },
     
        getOverrideExecution: function(sOverrideMember) {
            if (sOverrideMember === LifecycleConstants.ON_BEFORE_RENDERING) {
                return OverrideExecution.After;
            } else if (sOverrideMember === LifecycleConstants.ON_BEFORE_RENDERING_PLUGIN) {
                return OverrideExecution.After;
            } else if (sOverrideMember === LifecycleConstants.ON_AFTER_RENDERING) {
                return OverrideExecution.After;
            } else if (sOverrideMember === LifecycleConstants.ON_EXIT) {
                return OverrideExecution.After;
            };
            return null;
        },
        
        /**
         * Returns the name of the core extension this overrides
         *
         * @returns {string} core extension name
         * @public
         */
        getExtensionName: function () {
            return LifecycleConstants.EXTENSION_NAME;
        },

        onBeforeRendering: function(oEvent){
            if (!this._bInitialized) {
                let oConfiguration = this.getController().getConfiguration();
                if (oConfiguration) {
                    if (typeof oConfiguration.logToConsole !== "undefined") {
                        this._oExtensionUtilities.setLogToConsole(oConfiguration.logToConsole);
                    } else {
                        this._oExtensionUtilities.setLogToConsole(false);
                    }
                }
                let oData = this._oExtensionUtility.getJsonData("rits/custom/plugin/operationpodselection/model/SuppliersModel.json");
                console.log("o data: ",oData);
                let oModel = new JSONModel();
                oModel.setData(oData);
                console.log("o model data: ",oModel);
                this.getController().getView().setModel(oModel, "suppliers");
            }
            this._oExtensionUtilities.logMessage("LifecycleExtension.onBeforeRendering: WC POD Selection extension");
        },

        onBeforeRenderingPlugin: function(oEvent){
            this._oExtensionUtilities.logMessage("LifecycleExtension.onBeforeRenderingPlugin: WC POD Selection extension");
            // this.subscribe("WorklistSelectEvent", this.onWorklistSelectionChangeEvent, this);
        },

        onAfterRendering: function(oEvent){
            this._oExtensionUtilities.logMessage("LifecycleExtension.onAfterRendering: WC POD Selection extension");
            let that = this;
            console.log(" that values: ",that);
            setTimeout(function() {
                that._oExtensionUtility.loadOverflowToolbar(that.onHelpPress, that);
                that._oExtensionUtility.loadFilterBar(that.onCustomFilterPress, that);
                that._oExtensionUtility.loadShopOrderFilter(that.onCustomShopOrderFilterPress, that);
                that._oExtensionUtility.loadStatusFilter(that.onCustomStatusFilterPress,that);
            }, 1000);
            // this.subscribe("WorklistSelectEvent", this.onWorklistSelectionChangeEvent, this);
        },

        onExit: function(oEvent){
            this._oExtensionUtilities.logMessage("LifecycleExtension.onExit: WC POD Selection extension");
        },

		onHelpPress: function (oEvent) {
            this._oExtensionUtility.showMessage("Help", "Select filters and press 'Go'", "To retrieve the worklist, load required filters and press 'Go'");
		},

		onCustomFilterPress: function (oEvent) {
            let oInputField = oEvent.getSource();
            console.log("o input filed: ",oInputField);
            let sSupplier = oInputField.getValue();
            console.log("cutom input field value: ",sSupplier);
            let oPodSelectionModel = this.getController().getPodSelectionModel();
            if (oPodSelectionModel) {
                if (!oPodSelectionModel.customData) {
                    oPodSelectionModel.customData = {};
                }
            }
            oPodSelectionModel.customData.supplier = sSupplier;
            if (PodUtility.isNotEmpty(sSupplier)) {
                this._oExtensionUtility.showMessageToast("Supplier '" + sSupplier + "' selected");
            }
		},

		onCustomShopOrderFilterPress: function (oEvent) {
            let oInputField = oEvent.getSource();
            let sShopOrder = oInputField.getValue();
            console.log("shop order input value: ", sShopOrder);
        
            let oController = this.getController();
            let oPodSelectionModel = oController.getPodSelectionModel();
            // console.log("Table object: ", this.getController().getWorklistTable());

            if (oPodSelectionModel) {
                if (!oPodSelectionModel.customData) {
                    oPodSelectionModel.customData = {};
                }
                oPodSelectionModel.customData.shopOrder = sShopOrder;
            }
        
            if (PodUtility.isNotEmpty(sShopOrder)) {
                this._oExtensionUtility.showMessageToast("Shop order '" + sShopOrder + "' entered");
        
                // oController.publish("WorklistRefreshEvent", {
                //     source: this,
                //     sendToAllPages: true
                // });
            }
		},

        onCustomStatusFilterPress: function (oEvent) {
            let oInputField = oEvent.getSource();
            console.log("o input data: ",oInputField);
            let sStatusFilter = oInputField.getValue();
            console.log("entered value of status filter:  ",sStatusFilter);
            let oPodSelectionModel = this.getController().getPodSelectionModel();
            console.log(" o pod selection model data: ",oPodSelectionModel);
            if (oPodSelectionModel) {
                if (!oPodSelectionModel.customData) {
                    oPodSelectionModel.customData = {};
                }
            }
            oPodSelectionModel.customData.statusFilter = sStatusFilter;
            if (PodUtility.isNotEmpty(sStatusFilter)) {
                this._oExtensionUtility.showMessageToast("Status filter '" + sStatusFilter + "' entered");
            }
           
		}
    })
});
