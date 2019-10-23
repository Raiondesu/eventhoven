import { unsubscribe } from './unsubscribe.js';
import { meta } from './meta-events.js';
import { doForAll } from './util.js';
/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @param [unsubscribe] - (optional) a custom unsubscribe handler
 * @param [meta] - (optional) a custom meta events handler collection
 * @returns a function that subscribes handlers to a given event in a collection
 */
export function subscribe(eventMap, _a) {
    var _b = _a === void 0 ? {
        unsubscribe: unsubscribe,
        meta: meta
    } : _a, m = _b.meta, unsub = _b.unsubscribe;
    return function (eventOrOpts, onceArg) {
        if (onceArg === void 0) { onceArg = true; }
        var event = typeof eventOrOpts === 'object' ? eventOrOpts.event : eventOrOpts;
        var once = typeof eventOrOpts === 'object' ? !!eventOrOpts.once : onceArg;
        return function () {
            var handlers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                handlers[_i] = arguments[_i];
            }
            handlers.forEach(function (handler) {
                // Emit meta-event (ignore promise)
                m.subscribe(eventMap, event, handler);
                eventMap[event].handlers.set(handler, once);
            });
            return function () { return unsub(eventMap)(event)
                .apply(null, handlers); };
        };
    };
}
export var on = subscribe;
/**
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
export var subscribeToAll = doForAll(subscribe);
export var onAll = subscribeToAll;
//# sourceMappingURL=subscribe.js.map