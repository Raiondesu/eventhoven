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
export function subscribe(eventMap, unsubscribeF = unsubscribe) {
    const subscribeHandlers = (event, once) => (...handlers) => {
        if (!eventMap[event]) {
            // Soft handle type mismatch
            eventMap[event] = {
                arity: 0,
                handlers: new Map(),
            };
        }
        handlers.forEach(handler => {
            if (typeof handler !== 'function') {
                return;
            }
            // Emit meta-event
            meta.subscribe(eventMap, event, handler);
            eventMap[event].handlers.set(handler, once);
        });
        return () => unsubscribeF(eventMap)(event)
            .apply(null, handlers);
    };
    function subscribeTo(eventOrOpts, onceArg = true) {
        const event = typeof eventOrOpts === 'object' ? eventOrOpts.event : eventOrOpts;
        const once = typeof eventOrOpts === 'object' ? !!eventOrOpts.once : onceArg;
        return subscribeHandlers(event, once);
    }
    return subscribeTo;
}
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