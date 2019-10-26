import { subscribe } from "./subscribe.js";
/**
 * Creates an event waiter for an event-map
 *
 * @param eventMap - an event-map to create a waiter for
 * @returns an event waiter
 */
export const wait = (eventMap) => 
/**
 * Wait for event to be emitted
 *
 * @param event - an event to wait for
 * @returns a promise that resolves as soon as the described event is emitted
 */
(event) => {
    const onEvent = subscribe(eventMap)(event, true);
    return new Promise(resolve => onEvent(((...args) => resolve(args))));
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
export const harmonicWait = (eventMap) => 
/**
 * Wait for event to be emitted
 *
 * @param event - an event to wait for
 * @returns an event waiter that returns a promise
 */
(event) => 
/**
 * Wait for event to be emitted
 *
 * @returns a promise that resolves as soon as the described event is emitted
 */
() => wait(eventMap)(event);
//# sourceMappingURL=wait.js.map