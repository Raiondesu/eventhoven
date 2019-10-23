"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_js_1 = require("./events.js");
var emit_js_1 = require("./emit.js");
var util_js_1 = require("./util.js");
exports.metaEvents = events_js_1.eventMap({
    subscribe: function (eventMap, eventName, handler) { },
    unsubscribe: function (eventMap, eventName, handler) { },
    emit: function (eventMap, eventName, args) { },
});
var emitMeta = emit_js_1.emit(exports.metaEvents);
exports.meta = util_js_1.mapObject(exports.metaEvents, function (eventName) {
    var emitEvent = emitMeta(eventName);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (_) {
            if (args[0] === exports.metaEvents) {
                return _();
            }
            return _(emitEvent.apply(void 0, tslib_1.__spread(args)));
        });
    };
});
//# sourceMappingURL=meta-events.js.map