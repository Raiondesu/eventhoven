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
import { eventMap } from "./events.js";
import { emit } from "./emit.js";
export var metaEvents = eventMap({
    subscribe: function (_, _eventMap, _eventName, _handler) { },
    unsubscribe: function (_, _eventMap, _eventName, _handler) { },
    emit: function (_, _eventMap, _eventName, _args) { },
});
export var emitMeta = function (event) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args[0] !== metaEvents
        ? emit(metaEvents)(event).apply(void 0, __spread(args)) : Promise.resolve();
}; };
//# sourceMappingURL=meta-events.js.map