import { mapObject } from './util.js';
import { emit } from './emit.js';
import { subscribe } from './subscribe.js';
import { unsubscribe } from './unsubscribe.js';
// TODO: reduce code duplication in this module!
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export const emitCollection = (eventMap) => mapObject(eventMap, emit(eventMap));
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
export const subscribeCollection = (eventMap) => mapObject(eventMap, subscribe(eventMap));
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
export const unsubscribeCollection = (eventMap) => mapObject(eventMap, unsubscribe(eventMap));
/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
export const eventCollection = (eventMap) => ({
    emit: emitCollection(eventMap),
    subscribe: mapObject(eventMap, subscribe(eventMap)),
    unsubscribe: unsubscribeCollection(eventMap),
});
//# sourceMappingURL=collections.js.map