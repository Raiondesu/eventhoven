"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var emit_1 = require("./emit");
var subscribe_1 = require("./subscribe");
var unsubscribe_1 = require("./unsubscribe");
// TODO: reduce code duplication in this module!
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
exports.emitCollection = function (eventMap) { return util_1.mapObject(eventMap, emit_1.emit(eventMap)); };
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
exports.subscribeCollection = function (eventMap) { return util_1.mapObject(eventMap, subscribe_1.subscribe(eventMap)); };
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
exports.unsubscribeCollection = function (eventMap) { return util_1.mapObject(eventMap, unsubscribe_1.unsubscribe(eventMap)); };
/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
exports.eventCollection = function (eventMap) { return ({
    emit: exports.emitCollection(eventMap),
    subscribe: util_1.mapObject(eventMap, subscribe_1.subscribe(eventMap)),
    unsubscribe: exports.unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map