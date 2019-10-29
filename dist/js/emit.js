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
import { emitMeta } from "./meta-events.js";
import { mapObject } from "./util.js";
export var emit = function (eventMap) {
    return function (event) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, e) { return Promise.all(__spread([
                emitMeta('emit')(eventMap, event, args)
            ], __spread(eventMap[event]).map(function (_a) {
                var _b = __read(_a, 2), handler = _b[0], unsubscribe = _b[1];
                return handler
                    && handler.apply(void 0, __spread([{ event: event, unsubscribe: unsubscribe }], args));
            }))).then(function (_) { return resolve(); }, e); });
        };
    };
};
export var emitAll = function (eventMap) { return function (eventArgs) { return mapObject(eventMap, function (name) { return emit(eventMap)(name).apply(void 0, __spread(eventArgs[name])); }); }; };
//# sourceMappingURL=emit.js.map