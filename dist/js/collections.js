"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_js_1 = require("./util.js");
var emit_js_1 = require("./emit.js");
var subscribe_js_1 = require("./subscribe.js");
var unsubscribe_js_1 = require("./unsubscribe.js");
var createCollection = function (action) { return function (eventMap) { return util_js_1.mapObject(eventMap, action(eventMap)); }; };
// TODO - remove type-casting
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
exports.emitCollection = createCollection(emit_js_1.emit);
/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
exports.subscribeCollection = createCollection(subscribe_js_1.subscribe);
/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
exports.unsubscribeCollection = createCollection(unsubscribe_js_1.unsubscribe);
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