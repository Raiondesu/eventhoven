import { subscribe } from './subscribe.js';
/**
 * Create event waiter for an event-map
 *
 * @param eventMap - an event-map to create a waiter for
 * @returns an event waiter
 */
export var wait = function (eventMap) {
    /**
     * Wait for event to be emitted
     *
     * @param event - an event to wait for
     * @returns a promise that resolves as soon as the described event is emitted
     */
    return function (event) {
        var onEvent = subscribe(eventMap)(event, true);
        return new Promise(function (resolve) { return onEvent((function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return resolve(args);
        })); });
    };
};
//# sourceMappingURL=wait.js.map