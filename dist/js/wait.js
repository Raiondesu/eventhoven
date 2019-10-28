"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscribe_1 = require("./subscribe");
exports.wait = function (eventMap) {
    return function (event) { return new Promise(function (resolve) {
        return subscribe_1.subscribe(eventMap)(event)((function (_) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_.unsubscribe(),
                resolve(args));
        }));
    }); };
};
exports.harmonicWait = function (eventMap) {
    return function (event) {
        return function () { return exports.wait(eventMap)(event); };
    };
};
//# sourceMappingURL=wait.js.map