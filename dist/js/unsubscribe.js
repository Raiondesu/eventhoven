"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
exports.unsubscribe = function (eventMap) { return function (event) { return function () {
    var handlers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handlers[_i] = arguments[_i];
    }
    return (handlers.length > 0 ? (handlers.forEach(function (h) { return (meta_events_1.emitMeta('unsubscribe')(eventMap, event, h),
        eventMap[event].splice(eventMap[event].findIndex(function (_) { return _[0] == h; }), 1)); })) : (eventMap[event].forEach(function (_a) {
        var _b = __read(_a, 1), h = _b[0];
        return (meta_events_1.emitMeta('unsubscribe')(eventMap, event, h));
    }),
        eventMap[event].splice(0)));
}; }; };
exports.off = exports.unsubscribe;
exports.unsubscribeFromAll = util_1.doForAll(exports.unsubscribe);
exports.offAll = exports.unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map