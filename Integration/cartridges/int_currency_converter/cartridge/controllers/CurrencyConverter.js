"use strict";

var server = require("server");

server.get("Rate", function (req, res, next) {
    var helper = require("*/cartridge/scripts/helper");
    var currencyConverter = require("*/cartridge/scripts/currencyConverter");

    try {
    var accessKey = helper.currencyHelperObj.GET_EXCHANGE_RATE_ACCESS_KEY();
    var params = {accessKey: accessKey};
    var service_response = currencyConverter.currencyConverterSvc(params);

    if (service_response && service_response["success"]) {
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var labelCustomObject = "currencyExchangeRate";
        try {
            var exchangeRateObj = CustomObjectMgr.getCustomObject('exchangeRates', labelCustomObject);

            Transaction.wrap(function () {
                if (empty(exchangeRateObj)) {
                    // Add new
                    exchangeRateObj = CustomObjectMgr.createCustomObject('exchangeRates', labelCustomObject);
                }
                exchangeRateObj.custom.ExchangeRateResponse = service_response;
                exchangeRateObj.custom.ExchangeRates = service_response['rates'];
                exchangeRateObj.custom.LastSyncedOn = service_response['date'];
            });
        } catch (ex) {
            Logger.error('Something went wrong while creating currencyExchangeRates CO, Exception is: ' + ex);
        }
    }

    res.print(service_response);
    }catch(e) {
        res.json({
            success: false
        });
    }
    next();
});

module.exports = server.exports();
