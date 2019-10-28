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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var unsubscribe_1 = require("./unsubscribe");
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
exports.subscribe = function (eventMap) { return function (event) { return function () {
    var handlers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handlers[_i] = arguments[_i];
    }
    var unsub = function () { return unsubscribe_1.unsubscribe(eventMap)(event)
        .apply(null, handlers); };
    handlers.forEach(function (handler) {
        meta_events_1.emitMeta('subscribe')(eventMap, event, handler);
        eventMap[event].push([handler, unsub]);
    });
    return unsub;
}; }; };
exports.on = exports.subscribe;
exports.once = function (handler) { return function (_) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return (handler.apply(void 0, __spread([_], args)), _.unsubscribe());
}; };
exports.subscribeToAll = util_1.doForAll(exports.subscribe);
exports.onAll = exports.subscribeToAll;
//# sourceMappingURL=subscribe.js.map