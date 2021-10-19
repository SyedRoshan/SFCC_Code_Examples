"use strict";

var Site = require("dw/system/Site");

var currencyHelperObj = {

    GET_EXCHANGE_RATE_ACCESS_KEY: function () {

        return this.GET_PREFERENCE_VALUE("ExchangeRateAccessKey");
    },
    GET_PREFERENCE_VALUE: function (preference_key) {
        var sitePrefs = Site.getCurrent().getPreferences();
        var accessKey = sitePrefs.getCustom()[preference_key];

        return accessKey;
    }
};

module.exports =  currencyHelperObj;
