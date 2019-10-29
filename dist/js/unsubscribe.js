var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export var unsubscribe = function (eventMap) { return function (event) { return function () {
    var e_1, _a;
    var handlers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handlers[_i] = arguments[_i];
    }
    try {
        for (var _b = __values(handlers.length > 0
            ? handlers
            : eventMap[event].keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var h = _c.value;
            emitMeta('unsubscribe')(eventMap, event, h),
                eventMap[event].delete(h);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}; }; };
export var off = unsubscribe;
export var unsubscribeFromAll = doForAll(unsubscribe);
export var offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map