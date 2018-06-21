"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controller/userController");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.userController = new userController_1.default();
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.routes = function () {
        var _this = this;
        this.router.get('/', function (req, res) {
            return _this.userController.findAll(req, res);
        });
        this.router.get('/:userID', function (req, res) {
            return _this.userController.findOne(req, res);
        });
        this.router.post('/', function (req, res) {
            return _this.userController.create(req, res);
        });
        this.router.put('/:userID', function (req, res) {
            return _this.userController.update(req, res);
        });
        this.router.delete('/:userID', function (req, res) {
            return _this.userController.delete(req, res);
        });
    };
    return UserRouter;
}());
this.userRoutes = new UserRouter();
this.userRoutes.routes();
exports.default = this.userRoutes.router;
//# sourceMappingURL=UserRouter.js.map