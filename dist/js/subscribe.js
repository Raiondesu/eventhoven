import { unsubscribe } from './unsubscribe';
import { meta } from './meta-events';
import { doForAll } from './util';
/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @param unsubscribeF - a custom unsubscribe handler
 * @returns a function that subscribes handlers to a given event in a collection
 */
export function subscribe(eventMap, unsubscribeF) {
    if (unsubscribeF === void 0) { unsubscribeF = unsubscribe; }
    var subscribeHandlers = function (event, once) { return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        if (!eventMap[event]) {
            // Soft handle type mismatch
            eventMap[event] = {
                arity: 0,
                handlers: new Map(),
            };
        }
        handlers.forEach(function (handler) {
            if (typeof handler !== 'function') {
                return;
            }
            // Emit meta-event
            meta.subscribe(eventMap, event, handler);
            eventMap[event].handlers.set(handler, once);
        });
        return function () { return unsubscribeF(eventMap)(event)
            .apply(null, handlers); };
    }; };
    function subscribeTo(eventOrOpts, onceArg) {
        if (onceArg === void 0) { onceArg = true; }
        var event = typeof eventOrOpts === 'object' ? eventOrOpts.event : eventOrOpts;
        var once = typeof eventOrOpts === 'object' ? !!eventOrOpts.once : onceArg;
        return subscribeHandlers(event, once);
    }
    return subscribeTo;
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