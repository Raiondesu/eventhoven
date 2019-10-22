import { meta } from './meta-events';
import { doForAll } from './util';
export var unsubscribe = function (eventMap, m) {
    if (m === void 0) { m = meta; }
    return function (event) { return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return handlers.forEach(function (_) {
            var _a;
            return (
            // Emit meta-event (ignore promise)
            m.unsubscribe(eventMap, event, _), (_a = eventMap[event]) === null || _a === void 0 ? void 0 : _a.handlers.delete(_));
        });
    }; };
};
export var off = unsubscribe;
export var unsubscribeFromAll = doForAll(unsubscribe);
export var offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map