"use strict";

var server = require("server");

server.get("Rate", function (req, res, next) {
    var helper = require("*/cartridge/scripts/helper");
    var currencyConverter = require("*/cartridge/scripts/currencyConverter");

    var accessKey = helper.currencyHelperObj.GET_EXCHANGE_RATE_ACCESS_KEY();
    var params = {accessKey: accessKey};
    var service_response = currencyConverter.currencyConverterSvc(params);
    res.print(service_response);
    //TODO: Handle Response failures
    //TODO: Store valid response in custom cache/ custom object
    next();
});

module.exports = server.exports();
