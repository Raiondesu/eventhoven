import { emitMeta } from "./meta-events.js";
import { mapObject } from "./util.js";
/**
 * Event-emitter factory creator
 *
 * Creates an emitter factory for specific events.
 *
 * @param eventMap - an event collection to create an emitter for
 */
export const emit = (eventMap) => 
/**
 * Emitter factory for a specific event collection
 *
 * Creates an emitter for a specific event
 *
 * @param event - the name of the event to emit
 */
(event) => 
/**
 * Emits an event with proper arguments
 */
(...args) => {
    const handlers = eventMap[event];
    const results = [
        // Emit meta-event
        emitMeta('emit')(eventMap, event, args)
    ];
    // Mandates non-blocking flow
    return new Promise(resolve => setTimeout(() => (handlers.forEach((once, handler) => (results.push(handler && handler
        .bind(null, { event, once })
        .apply(null, args)),
        (once && handlers.delete(handler)))),
        resolve(Promise.all(results).then(_ => void 0))), 0));
};
/**
 * Emit all events for a given event collection
 *
 * @param eventMap - event collection to emit events for
 *
 * @returns a function that emits all events from a collection with given arguments
 */
export const emitAll = (eventMap) => (eventArgs) => mapObject(eventMap, (name) => emit(eventMap)(name)
    .apply(null, eventArgs[name]));
//# sourceMappingURL=emit.js.map