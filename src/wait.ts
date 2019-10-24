import { TEventMap, THandlerOf } from './events.js';
import { subscribe } from './subscribe.js';

/**
 * Create event waiter for an event-map
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
) => {
  const onEvent = subscribe(eventMap)(event, true);

  return new Promise<Parameters<THandlerOf<M, E>>>(resolve => onEvent((
    (...args: Parameters<THandlerOf<M, E>>) => resolve(args)
  ) as THandlerOf<M, E>));
};
