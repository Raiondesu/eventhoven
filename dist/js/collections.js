import { mapObject } from './util.js';
import { emit } from './emit.js';
import { subscribe } from './subscribe.js';
import { unsubscribe } from './unsubscribe.js';
var createCollection = function (action) { return function (eventMap) { return mapObject(eventMap, action(eventMap)); }; };
// TODO - remove type-casting
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export var emitCollection = createCollection(emit);
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
export var subscribeCollection = createCollection(subscribe);
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
export var unsubscribeCollection = createCollection(unsubscribe);
/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
export var eventCollection = function (eventMap) { return ({
    emit: emitCollection(eventMap),
    subscribe: subscribeCollection(eventMap),
    unsubscribe: unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map