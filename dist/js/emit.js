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
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
exports.emit = function (eventMap) {
    return function (event) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, e) { return setTimeout(function () { return Promise.all(__spread([
                meta_events_1.emitMeta('emit')(eventMap, event, args)
            ], eventMap[event].map(function (_a) {
                var _b = __read(_a, 2), handler = _b[0], unsubscribe = _b[1];
                return (handler && handler
                    .bind(null, { event: event, unsubscribe: unsubscribe })
                    .apply(null, args));
            }))).then(function (_) { return resolve(); }, e); }, 0); });
        };
    };
};
exports.emitAll = function (eventMap) { return function (eventArgs) { return util_1.mapObject(eventMap, function (name) { return exports.emit(eventMap)(name)
    .apply(null, eventArgs[name]); }); }; };
//# sourceMappingURL=emit.js.map