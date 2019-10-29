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
import { unsubscribe } from "./unsubscribe.js";
import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export var subscribe = function (eventMap) { return function (event) { return function () {
    var handlers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handlers[_i] = arguments[_i];
    }
    var unsub = function (_handlers) { return function () { return unsubscribe(eventMap)(event).apply(void 0, __spread(_handlers)); }; };
    handlers.forEach(function (handler) {
        emitMeta('subscribe')(eventMap, event, handler);
        eventMap[event].set(handler, unsub([handler]));
    });
    return unsub(handlers);
}; }; };
export var on = subscribe;
export var once = function (handler) { return function (_) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return (handler.apply(void 0, __spread([_], args)), _.unsubscribe());
}; };
export var subscribeToAll = doForAll(subscribe);
export var onAll = subscribeToAll;
//# sourceMappingURL=subscribe.js.map