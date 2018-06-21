"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:prefer-for-of
var jwt = require("jsonwebtoken");
var Utils_1 = require("./Utils");
function authenticateBefore(target, key, descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var _this = this;
        var args = [];
        var status = { status: false, user: false };
        for (var index = 0; index < arguments.length; index++) {
            args.push(arguments[index]);
        }
        var req = args[0];
        var res = args[1];
        var token = req.body.token || req.headers['x-access-token'] || '';
        jwt.verify(token, Utils_1.default.getTokenKey(), function (err, decoded) {
            if (err) {
                res.status(401).json(__assign({ success: false }, err));
            }
            else {
                status.status = true;
                status.user = decoded;
                args.push(status);
                originalMethod.apply(_this, args);
            }
            return status;
        });
    };
    return descriptor;
}
exports.default = authenticateBefore;
//# sourceMappingURL=Middleware.js.map