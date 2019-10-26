"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
/**
 * Event-emitter factory creator
 *
 * Creates an emitter factory for specific events.
 *
 * @param eventMap - an event collection to create an emitter for
 */
exports.emit = function (eventMap) {
    /**
     * Emitter factory for a specific event collection
     *
     * Creates an emitter for a specific event
     *
     * @param event - the name of the event to emit
     */
    return function (event) {
        /**
         * Emits an event with proper arguments
         */
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var handlers = eventMap[event];
            var results = [
                // Emit meta-event
                meta_events_1.emitMeta('emit')(eventMap, event, args)
            ];
            // Mandates non-blocking flow
            return new Promise(function (resolve) { return setTimeout(function () { return (handlers.forEach(function (once, handler) { return (results.push(handler && handler
                .bind(null, { event: event, once: once })
                .apply(null, args)),
                (once && handlers.delete(handler))); }),
                resolve(Promise.all(results).then(function (_) { return void 0; }))); }, 0); });
        };
    };
};
/**
 * Emit all events for a given event collection
 *
 * @param eventMap - event collection to emit events for
 *
 * @returns a function that emits all events from a collection with given arguments
 */
exports.emitAll = function (eventMap) { return function (eventArgs) { return util_1.mapObject(eventMap, function (name) { return exports.emit(eventMap)(name)
    .apply(null, eventArgs[name]); }); }; };
//# sourceMappingURL=emit.js.map