"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var emit_1 = require("./emit");
var subscribe_1 = require("./subscribe");
var unsubscribe_1 = require("./unsubscribe");
var createCollection = function (action) { return function (eventMap) { return util_1.mapObject(eventMap, action(eventMap)); }; };
// TODO - remove type-casting
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
exports.emitCollection = createCollection(emit_1.emit);
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
exports.subscribeCollection = createCollection(subscribe_1.subscribe);
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
exports.unsubscribeCollection = createCollection(unsubscribe_1.unsubscribe);
/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
exports.eventCollection = function (eventMap) { return ({
    emit: exports.emitCollection(eventMap),
    subscribe: exports.subscribeCollection(eventMap),
    unsubscribe: exports.unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map