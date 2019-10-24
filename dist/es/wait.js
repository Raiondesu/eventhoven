import { subscribe } from './subscribe.js';
/**
 * Create event waiter for an event-map
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
//# sourceMappingURL=wait.js.map