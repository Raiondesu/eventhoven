"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_js_1 = require("./util.js");
var emit_js_1 = require("./emit.js");
var subscribe_js_1 = require("./subscribe.js");
var unsubscribe_js_1 = require("./unsubscribe.js");
// TODO: reduce code duplication in this module!
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
exports.emitCollection = function (eventMap) { return util_js_1.mapObject(eventMap, emit_js_1.emit(eventMap)); };
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
exports.subscribeCollection = function (eventMap) { return util_js_1.mapObject(eventMap, subscribe_js_1.subscribe(eventMap)); };
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
exports.unsubscribeCollection = function (eventMap) { return util_js_1.mapObject(eventMap, unsubscribe_js_1.unsubscribe(eventMap)); };
/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
exports.eventCollection = function (eventMap) { return ({
    emit: exports.emitCollection(eventMap),
    subscribe: util_js_1.mapObject(eventMap, subscribe_js_1.subscribe(eventMap)),
    unsubscribe: exports.unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map