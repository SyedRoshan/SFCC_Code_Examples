"use strict";

var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

var currencyConverterSvc = LocalServiceRegistry.createService("int.exchangerate.rest", {
    createRequest: function (service, params) {
        service.addHeader("Content-Type", "text/json");
        var url = service.getURL();
        url = url + "?access_key=" + params;
        service.setURL(url);
    },
    parseResponse: function (service, response) {
        return response.text;
    }
});

module.exports = currencyConverterSvc;
