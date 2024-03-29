import { subscribe } from './subscribe';
import { TEventMap, THandlerOf, TLastParams } from './types';
import { once } from './once';

/**
 * Creates an event waiter for an event-map
 *
 * @param eventMap - an event-map to create a waiter for
 * @returns an event waiter
 */
export const wait = <M extends TEventMap>(
  eventMap: M
) =>
/**
 * Wait for event to be emitted
 *
 * @param event - an event to wait for
 * @returns a promise that resolves as soon as the described event is emitted
 */
<E extends keyof M>(
  event: E
) => new Promise<TLastParams<THandlerOf<M, E>>>(resolve =>
  subscribe(eventMap)(event)(
    once(((_, ...args: TLastParams<THandlerOf<M, E>>) => resolve(args)) as THandlerOf<M, E>)
  )
);

/**
 * Creates an event waiter factory for an event-map
 *
 * Same as `wait`, but in-harmony with the other methods
 * due to having an arity of 3.
 *
 * @param eventMap - an event-map to create a waiter for
 * @returns an event waiter factory
 */
export const harmonicWait = <M extends TEventMap>(
  eventMap: M
) =>
/**
 * Wait for event to be emitted
 *
 * @param event - an event to wait for
 * @returns an event waiter that returns a promise
 */
<E extends keyof M>(
  event: E
) =>
/**
 * Wait for event to be emitted
 *
 * @returns a promise that resolves as soon as the described event is emitted
 */
() => wait(eventMap)(event);
