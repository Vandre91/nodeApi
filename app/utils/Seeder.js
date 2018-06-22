"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt-nodejs");
var User_1 = require("../models/User");
var Utils_1 = require("./Utils");
var Seeder = /** @class */ (function () {
    function Seeder() {
        this.user = Utils_1.default.getDefaultUser();
        this.user.password = bcrypt.hashSync(this.user.password);
    }
    Seeder.prototype.seedUser = function () {
        var _this = this;
        return this.verifyIfNotExist().then(function (_) {
            if (!_) {
                var user = new User_1.default(_this.user);
                return user.save()
                    .then(function (__) {
                    return true;
                }).catch(function (__) {
                    return false;
                });
            }
            else {
                return false;
            }
        });
    };
    Seeder.prototype.verifyIfNotExist = function () {
        return User_1.default.findOne({ role: this.user.role }).then(function (_) {
            return (_) ? true : false;
        }).catch(function (_) {
            return false;
        });
    };
    return Seeder;
}());
exports.default = Seeder;
//# sourceMappingURL=Seeder.js.map