"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var User_1 = require("../models/User");
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
    }
    AuthenticationController.prototype.authenticate = function (req, res, secretKey) {
        var token = req.body.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
                }
                else {
                    res.json({ success: true, message: 'Enjoy your token!', token: decoded });
                }
            });
        }
        else if (req.body.username) {
            User_1.default.findOne({ username: req.body.username }, function (err, user) {
                if (err) {
                    res.status(403).send({ succes: false, err: err });
                }
                else if (!user) {
                    res.status(403).send({ success: false, message: 'Authentication failed. User not found.' });
                }
                else if (user) {
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    }
                    else {
                        res.json({
                            message: 'Enjoy your token!',
                            success: true,
                            token: jwt.sign({ username: user.username, id: user._id, firstName: user.firstName, lastName: user.lastName }, secretKey, { expiresIn: 86400 })
                        });
                    }
                }
            });
        }
        else {
            res.status(400).json({
                message: 'No token or identifier provided.',
                succes: false,
            });
        }
    };
    return AuthenticationController;
}());
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map