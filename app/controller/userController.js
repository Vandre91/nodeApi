"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt-nodejs");
var User_1 = require("../models/User");
var Middleware_1 = require("../utils/Middleware");
var Utils_1 = require("../utils/Utils");
var AuthenticationController_1 = require("./AuthenticationController");
var UserController = /** @class */ (function () {
    function UserController() {
        this.authController = new AuthenticationController_1.default();
    }
    UserController.prototype.findAll = function (req, res, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.find({}).then(function (data) {
                            res.status(200).json(Utils_1.default.formatData(true, data));
                        }).catch(function (error) {
                            res.status(500).json(Utils_1.default.formatData(false, error));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findOne = function (req, res, status) {
        return __awaiter(this, void 0, void 0, function () {
            var _id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (status.user.role === 1 && req.params.userID !== status.user.id) {
                            res.status(401).json({
                                success: false,
                                message: 'Unauthorized'
                            });
                        }
                        _id = req.params.userID;
                        return [4 /*yield*/, User_1.default.findOne({ _id: _id })
                                .then(function (data) {
                                res.status(200);
                                res.json(Utils_1.default.formatData(true, data));
                            })
                                .catch(function (error) {
                                res.status(500);
                                res.json(Utils_1.default.formatData(false, error));
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.create = function (req, res, status) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName, username, email, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstName = req.body.firstname;
                        lastName = req.body.lastname;
                        username = req.body.username;
                        email = req.body.email;
                        password = bcrypt.hashSync(req.body.password);
                        user = new User_1.default({
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            password: password,
                            username: username
                        });
                        return [4 /*yield*/, user.save()
                                .then(function (data) {
                                res.status(201).json(Utils_1.default.formatData(true, data));
                            }).catch(function (error) {
                                res.status(500).json(Utils_1.default.formatData(false, error));
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res, status) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, updatedAt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (status.user.role === 1 && req.params.userID !== status.user.id) {
                            res.status(401).json({
                                success: false,
                                message: 'Unauthorized'
                            });
                        }
                        _id = req.params.userID;
                        updatedAt = new Date();
                        if (req.body.password) {
                            req.body.password = bcrypt.hashSync(req.body.password);
                        }
                        return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: _id }, __assign({}, req.body, { updatedAt: updatedAt }), { new: true })
                                .then(function (data) {
                                res.status(200).json(Utils_1.default.formatData(true, data));
                            })
                                .catch(function (error) {
                                res.status(500).json(Utils_1.default.formatData(false, error));
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res, status) {
        return __awaiter(this, void 0, void 0, function () {
            var _id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (status.user.role === 1 && req.params.userID !== status.user.id) {
                            res.status(401).json({
                                success: false,
                                message: 'Unauthorized'
                            });
                        }
                        _id = req.params.userID;
                        return [4 /*yield*/, User_1.default.findOneAndRemove({ _id: _id })
                                .then(function () {
                                res.status(204).end();
                            })
                                .catch(function (error) {
                                res.status(500).json(Utils_1.default.formatData(false, error));
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Middleware_1.default
    ], UserController.prototype, "findAll", null);
    __decorate([
        Middleware_1.default
    ], UserController.prototype, "findOne", null);
    __decorate([
        Middleware_1.default
    ], UserController.prototype, "create", null);
    __decorate([
        Middleware_1.default
    ], UserController.prototype, "update", null);
    __decorate([
        Middleware_1.default
    ], UserController.prototype, "delete", null);
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=userController.js.map