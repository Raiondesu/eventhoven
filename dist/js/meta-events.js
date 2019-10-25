"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_js_1 = require("./events.js");
var emit_js_1 = require("./emit.js");
exports.metaEvents = events_js_1.eventMap({
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
        if (args[0] === exports.metaEvents) {
            return resolve();
        }
        return resolve(emit_js_1.emit(exports.metaEvents)(event).apply(null, args));
    });
}; };
//# sourceMappingURL=meta-events.js.map