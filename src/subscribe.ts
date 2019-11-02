import { unsubscribe } from './unsubscribe';
import { emitMeta } from './emit';
import { TEventMap, THandlerOf, TUnsubscribe } from './types';
import { EMetaEvents } from './meta-events';

export type TSubscriber<M extends TEventMap, N extends keyof M> = {
  (handler: THandlerOf<M, N>): TUnsubscribe<N>;
  (...handlers: Array<THandlerOf<M, N>>): TUnsubscribe<N>;
};

type TSubscriberFactory<M extends TEventMap> = {
  <E extends keyof M>(event: E): TSubscriber<M, E>;
};

/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to a given event in a collection
 */
export const subscribe = <M extends TEventMap>(
  eventMap: M
): TSubscriberFactory<M> => <E extends keyof M>(
  event: E
): TSubscriber<M, E> => {
  const unsub = (
    ...handlers: Array<THandlerOf<M, E>>
  ) => () => unsubscribe(eventMap)(event)(...handlers);

  return (
    ...handlers: Array<THandlerOf<M, E>>
  ) => unsub(...handlers.map(handler => (
    // Emit meta-event (ignore promise)
    emitMeta(EMetaEvents.SUBSCRIBE)(eventMap, event, handler),
    event in eventMap && eventMap[event].set(handler, unsub(handler)),
    handler
  )));
};

export const on = subscribe;
