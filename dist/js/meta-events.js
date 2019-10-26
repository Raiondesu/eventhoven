"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var emit_1 = require("./emit");
exports.metaEvents = events_1.eventMap({
    subscribe: function (eventMap, eventName, handler) { },
    unsubscribe: function (eventMap, eventName, handler) { },
    emit: function (eventMap, eventName, args) { },
});
exports.emitMeta = function (event) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new Promise(function (resolve) {
        if (args[0] !== exports.metaEvents) {
            resolve(emit_1.emit(exports.metaEvents)(event).apply(null, args));
        }
    });
}; };
//# sourceMappingURL=meta-events.js.map