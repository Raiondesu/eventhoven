import { __read, __spread } from "tslib";
import { meta } from './meta-events';
import { mapObject, doForAll } from './util';
/**
 * Event-emitter factory creator
 *
 * Creates an emitter factory for specific events.
 *
 * @param eventMap - an event collection to create an emitter for
 */
export var emit = function (eventMap, m) {
    if (m === void 0) { m = meta; }
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
            var _a = eventMap[event], arity = _a.arity, handlers = _a.handlers;
            var slicedArgs = arity > 0 ? args.slice(arity) : args;
            // Emit meta-event
            m.emit(eventMap, event, slicedArgs);
            handlers.forEach(function (once, handler) {
                handler.apply(void 0, __spread([{ event: event, once: once }], slicedArgs));
                once && handlers.delete(handler);
            });
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
export var emitAll = doForAll(emit);
/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export var emitCollection = function (eventMap) { return mapObject(eventMap, emit(eventMap)); };
//# sourceMappingURL=emit.js.map