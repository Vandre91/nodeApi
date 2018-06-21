"use strict";
// tslint:disable:no-console
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var http = require("http");
var server_1 = require("./server");
var Utils_1 = require("./utils/Utils");
debug('ts-express:server');
var port = normalizePort(Utils_1.default.getPort());
server_1.default.set('port', port);
console.log(Utils_1.default.newDate() + ": Server listening on port " + port);
var server = http.createServer(server_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var Port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(Port)) {
        return val;
    }
    else if (Port >= 0) {
        return Port;
    }
    else {
        return false;
    }
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(Utils_1.default.newDate() + ": " + bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(Utils_1.default.newDate() + ": " + bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
//# sourceMappingURL=index.js.map