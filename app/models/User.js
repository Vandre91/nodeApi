"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    createdAt: {
        default: Date.now,
        type: Date,
    },
    email: {
        default: '',
        required: true,
        type: String,
    },
    firstName: {
        default: '',
        required: true,
        type: String,
    },
    lastName: {
        default: '',
        required: true,
        type: String,
    },
    password: {
        default: '',
        required: true,
        type: String,
    },
    role: {
        default: 1,
        type: Number,
    },
    updatedAt: {
        default: Date.now,
        type: Date,
    },
    username: {
        default: '',
        lowercase: true,
        required: true,
        type: String,
        unique: true,
    },
});
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map