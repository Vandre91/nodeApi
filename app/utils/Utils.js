"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
exports.default = {
    log: function (stringToShow) { return new Date().toLocaleString('fr-FR', { timeZone: 'UTC' }) + ": " + stringToShow; },
    newDate: function () { return "" + new Date().toLocaleString('fr-FR', { timeZone: 'UTC' }); },
    getTokenKey: function () { return process.env.secret || config_1.default.secret; },
    getMONGO_URI: function () { return process.env.MONGODB_URI || config_1.default.database; },
    getApiUrl: function () { return process.env.apiUrl || config_1.default.api_url; },
    getPort: function () { return process.env.PORT || config_1.default.port; },
    getDefaultUser: function () { return (process.env.defaultUser) ? JSON.parse(process.env.defaultUser) : config_1.default.defaultUser; },
    formatData: function (success, data) {
        return { success: success, data: data };
    },
    app: null,
};
//# sourceMappingURL=Utils.js.map