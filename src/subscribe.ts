import { TEventMap, THandlerOf, TEventOptions } from './events';
import { unsubscribe, TUnsubscribe } from './unsubscribe';
import { emitMeta, TMetaEmit } from './meta-events';
import { doForAll, THandlersForAll, TLastParams } from './util';

export type TSubscriber<M extends TEventMap, N extends keyof M> = {
  (handler: THandlerOf<M, N>): TUnsubscribe<N>;
  (...handlers: Array<THandlerOf<M, N>>): TUnsubscribe<N>;
};

export type TSubscriberContext = {
  unsubscribe: typeof unsubscribe;
  meta: TMetaEmit;
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
): TSubscriber<M, E> => (...handlers: Array<THandlerOf<M, E>>) => {
  const unsub = () => unsubscribe(eventMap)(event)
    .apply(null, handlers);

  handlers.forEach(handler => {
    // Emit meta-event (ignore promise)
    emitMeta('subscribe')(eventMap, event, handler);

    eventMap[event].push([handler, unsub]);
  });

  return unsub;
};

export const on = subscribe;

export const once = <
  M extends TEventMap,
  E extends keyof M
>(handler: THandlerOf<M, E>) => (_: TEventOptions<M>, ...args: TLastParams<THandlerOf<M, E>>) => (
  handler(_, ...args),
  _.unsubscribe()
);

/**
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
export const subscribeToAll = <THandlersForAll> doForAll(subscribe);

export const onAll = subscribeToAll;
