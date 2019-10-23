import { meta } from './meta-events.js';
import { doForAll } from './util.js';
export var unsubscribe = function (eventMap, m) {
    if (m === void 0) { m = meta; }
    return function (event) { return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return (handlers.length > 0 ? (handlers.forEach(function (h) { return (
        // Emit meta-event (ignore promise)
        m.unsubscribe(eventMap, event, h),
            eventMap[event].handlers.delete(h)); })) : (eventMap[event].handlers.forEach(function (_, h) { return (
        // Emit meta-event (ignore promise)
        m.unsubscribe(eventMap, event, h)); }),
            eventMap[event].handlers.clear()));
    }; };
};
export var off = unsubscribe;
export var unsubscribeFromAll = doForAll(unsubscribe);
export var offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map