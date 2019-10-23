import { __read, __spread } from "tslib";
import { meta } from './meta-events.js';
import { doForAll } from './util.js';
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
            var results = [
                // Emit meta-event
                m.emit(eventMap, event, slicedArgs)
            ];
            // Mandates non-blocking flow
            return new Promise(function (resolve) { return setTimeout(function () {
                handlers.forEach(function (once, handler) {
                    results.push(Promise.resolve(handler.apply(void 0, __spread(slicedArgs))));
                    once && handlers.delete(handler);
                });
                resolve(Promise.all(results).then(function (_) { return void 0; }));
            }, 0); });
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
//# sourceMappingURL=emit.js.map