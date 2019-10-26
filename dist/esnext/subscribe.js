import { unsubscribe } from "./unsubscribe.js";
import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @param [unsubscribe] - (optional) a custom unsubscribe handler
 * @param [meta] - (optional) a custom meta events handler collection
 * @returns a function that subscribes handlers to a given event in a collection
 */
export const subscribe = (eventMap, { meta: m, unsubscribe: unsub, } = {
    unsubscribe,
    meta: emitMeta,
}) => (eventOrOpts, onceArg = false) => {
    const event = eventOrOpts.event || eventOrOpts;
    return (...handlers) => {
        handlers.forEach(handler => {
            // Emit meta-event (ignore promise)
            m('subscribe')(eventMap, event, handler);
            eventMap[event].handlers.set(handler, eventOrOpts.once || onceArg);
        });
        return () => unsub(eventMap)(event)
            .apply(null, handlers);
    };
};
export const on = subscribe;
/**
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
export const subscribeToAll = doForAll(subscribe);
export const onAll = subscribeToAll;
//# sourceMappingURL=subscribe.js.map