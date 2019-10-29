import { unsubscribe } from './unsubscribe';
import { emitMeta } from './emit';
import { doForAll, THandlersForAll } from './util';
import { TEventMap, THandlerOf, TUnsubscribe, TEventOptions, TLastParams } from './types';

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
): TSubscriber<M, E> => (...handlers: Array<THandlerOf<M, E>>) => (
  (unsub: (...h: Array<THandlerOf<M, E>>) => TUnsubscribe<E>) => unsub(
    ...handlers.map(handler => (
      // Emit meta-event (ignore promise)
      emitMeta('subscribe')(eventMap, event, handler),
      eventMap[event].set(handler, unsub(handler)),
      handler
    ))
  )
)((...handlers) => () => unsubscribe(eventMap)(event)(...handlers));

export const on = subscribe;

export const once = <
  M extends TEventMap,
  E extends keyof M
>(handler: THandlerOf<M, E>) => (
  _: TEventOptions<M>,
  ...args: TLastParams<THandlerOf<M, E>>
) => (handler(_, ...args), _.unsubscribe());

/**
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
export const subscribeToAll = <THandlersForAll> doForAll(subscribe);

export const onAll = subscribeToAll;
