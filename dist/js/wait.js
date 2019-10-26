"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscribe_1 = require("./subscribe");
/**
 * Creates an event waiter for an event-map
 *
 * @param eventMap - an event-map to create a waiter for
 * @returns an event waiter
 */
exports.wait = function (eventMap) {
    /**
     * Wait for event to be emitted
     *
     * @param event - an event to wait for
     * @returns a promise that resolves as soon as the described event is emitted
     */
    return function (event) {
        var onEvent = subscribe_1.subscribe(eventMap)(event, true);
        return new Promise(function (resolve) { return onEvent((function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return resolve(args);
        })); });
    };
};
/**
 * Creates an event waiter factory for an event-map
 *
 * Same as `wait`, but in-harmony with the other methods
 * due to having an arity of 3.
 *
 * @param eventMap - an event-map to create a waiter for
 * @returns an event waiter factory
 */
exports.harmonicWait = function (eventMap) {
    /**
     * Wait for event to be emitted
     *
     * @param event - an event to wait for
     * @returns an event waiter that returns a promise
     */
    return function (event) {
        /**
         * Wait for event to be emitted
         *
         * @returns a promise that resolves as soon as the described event is emitted
         */
        return function () { return exports.wait(eventMap)(event); };
    };
};
//# sourceMappingURL=wait.js.map