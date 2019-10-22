import { meta } from 'meta-events';
import { mapObject, doForAll } from './util';
/**
 * Event-emitter factory creator
 *
 * Creates an emitter factory for specific events.
 *
 * @param eventMap - an event collection to create an emitter for
 */
export const emit = (eventMap, m = meta) => 
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
    const { arity, handlers } = eventMap[event];
    const slicedArgs = arity > 0 ? args.slice(arity) : args;
    // Emit meta-event
    m.emit(eventMap, event, slicedArgs);
    handlers.forEach((once, handler) => {
        handler({ event, once }, ...slicedArgs);
        once && handlers.delete(handler);
    });
};
/**
 * Emit all events for a given event collection
 *
 * @param eventMap - event collection to emit events for
 *
 * @returns a function that emits all events from a collection with given arguments
 */
export const emitAll = doForAll(emit);
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export const emitCollection = (eventMap) => mapObject(eventMap, emit(eventMap));
//# sourceMappingURL=emit.js.map