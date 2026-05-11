/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["jsonbinding/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
