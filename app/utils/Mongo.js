"use strict";
// tslint:disable:no-console
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Utils_1 = require("./Utils");
var Mongo = /** @class */ (function () {
    function Mongo() {
        this.mongoose = mongoose;
        this.config();
    }
    Mongo.prototype.config = function () {
        this.mongoose.connect(Utils_1.default.getMONGO_URI());
        this.db = mongoose.connection;
        this.db.on('error', function () { return console.log(Utils_1.default.newDate() + ": connection error:"); });
        this.db.once('open', function () { return console.log(Utils_1.default.newDate() + ": Connected to Mongo"); });
    };
    return Mongo;
}());
exports.default = Mongo;
//# sourceMappingURL=Mongo.js.map