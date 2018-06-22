"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var permissions = {
    findAll: 9,
    findOne: 1,
    create: 9,
    update: 1,
    delete: 1,
    authenticate: 0,
};
exports.default = {
    secret: 'thisIsASecretKeyForParsingToken',
    database: 'mongodb://localhost/tes',
    port: 3000,
    api_url: '/api/v1/',
    defaultUser: {
        email: 'admin@admin.admin',
        firstName: 'admin',
        lastName: 'admin',
        password: 'admin',
        username: 'admin',
        role: 9,
    },
    permissions: permissions,
};
//# sourceMappingURL=config.js.map