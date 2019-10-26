"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
exports.unsubscribe = function (eventMap, m) {
    if (m === void 0) { m = meta_events_1.emitMeta; }
    return function (event) { return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return (handlers.length > 0 ? (handlers.forEach(function (h) { return (
        // Emit meta-event (ignore promise)
        m('unsubscribe')(eventMap, event, h),
            eventMap[event].delete(h)); })) : (eventMap[event].forEach(function (_, h) { return (
        // Emit meta-event (ignore promise)
        m('unsubscribe')(eventMap, event, h)); }),
            eventMap[event].clear()));
    }; };
};
exports.off = exports.unsubscribe;
exports.unsubscribeFromAll = util_1.doForAll(exports.unsubscribe);
exports.offAll = exports.unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map