import { mapObject } from './util';
import { emit } from './emit';
import { subscribe } from './subscribe';
import { unsubscribe } from './unsubscribe';
// TODO: reduce code duplication in this module!
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export var emitCollection = function (eventMap) { return mapObject(eventMap, emit(eventMap)); };
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
export var subscribeCollection = function (eventMap) { return mapObject(eventMap, subscribe(eventMap)); };
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
export var unsubscribeCollection = function (eventMap) { return mapObject(eventMap, unsubscribe(eventMap)); };
/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
export var eventCollection = function (eventMap) { return ({
    emit: emitCollection(eventMap),
    subscribe: mapObject(eventMap, subscribe(eventMap)),
    unsubscribe: unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map