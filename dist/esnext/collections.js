import { mapObject } from "./util.js";
import { emit } from "./emit.js";
import { subscribe } from "./subscribe.js";
import { unsubscribe } from "./unsubscribe.js";
export const createCollection = (action) => (eventMap) => mapObject(eventMap, action(eventMap));
// TODO - remove type-casting
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export const emitCollection = createCollection(emit);
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
export const subscribeCollection = createCollection(subscribe);
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
export const unsubscribeCollection = createCollection(unsubscribe);
/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
export const eventCollection = (eventMap) => ({
    emit: emitCollection(eventMap),
    subscribe: subscribeCollection(eventMap),
    unsubscribe: unsubscribeCollection(eventMap),
});
//# sourceMappingURL=collections.js.map