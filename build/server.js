"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server(app) {
        if (app === void 0) { app = (0, express_1.default)(); }
        this.app = app;
        this.configuration();
        this.routes();
    }
    Server.prototype.configuration = function () {
        this.app.set('port', process.env.PORT || 5000);
    };
    Server.prototype.routes = function () {
        this.app.get('/', function (req, res) {
            res.send('Node Express Typescript TypeORM Starter');
        });
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("Staring Server on port " + _this.app.get('port') + "...");
        });
    };
    return Server;
}());
exports.Server = Server;
exports.server = new Server();
exports.server.start();
