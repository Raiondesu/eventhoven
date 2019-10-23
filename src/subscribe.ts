import { TEventMap, THandlerOf } from './events.js';
import { unsubscribe, TUnsubscribe } from './unsubscribe.js';
import { meta, TMetaEmitters } from './meta-events.js';
import { doForAll } from './util.js';

export interface ISubscribeOptions<M extends TEventMap, N extends keyof M> {
  event: N;
  once?: boolean;
}

export type TSubscriber<M extends TEventMap, N extends keyof M> = {
  (handler: THandlerOf<M, N>): TUnsubscribe<N>;
  (...handlers: Array<THandlerOf<M, N>>): TUnsubscribe<N>;
};

export type TSubscriberContext = {
  unsubscribe: typeof unsubscribe;
  meta: TMetaEmitters;
}

/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @param [unsubscribe] - (optional) a custom unsubscribe handler
 * @param [meta] - (optional) a custom meta events handler collection
 * @returns a function that subscribes handlers to a given event in a collection
 */
export function subscribe<M extends TEventMap>(
  eventMap: M, {
    meta: m,
    unsubscribe: unsub
  }: TSubscriberContext = {
    unsubscribe,
    meta
  }
) {
  const subscribeHandlers = (event: keyof M, once: boolean): TSubscriber<M, keyof M> => (
    ...handlers: Array<THandlerOf<M>>
  ) => {
    if (!eventMap[event]) {
      // Soft handle type mismatch
      eventMap[event] = <M[keyof M]> {
        arity: 0,
        handlers: new Map(),
      };
    }

    handlers.forEach(handler => {
      if (typeof handler !== 'function') {
        return;
      }

      // Emit meta-event (ignore promise)
      m.subscribe(eventMap, event as keyof TEventMap, handler);

      eventMap[event].handlers.set(handler, once);
    });

    return () => unsub(eventMap)(event)
      .apply(null, handlers);
  };

  function subscribeTo<E extends keyof M>(event: E, once?: boolean): TSubscriber<M, E>;
  function subscribeTo<S extends ISubscribeOptions<M, keyof M>>(options: S): TSubscriber<M, S['event']>;
  function subscribeTo(
    eventOrOpts: keyof M | ISubscribeOptions<M, keyof M>,
    onceArg: boolean = true
  ) {
    const event = typeof eventOrOpts === 'object' ? eventOrOpts.event : eventOrOpts;
    const once = typeof eventOrOpts === 'object' ? !!eventOrOpts.once : onceArg;

    return subscribeHandlers(event, once);
  }

  return subscribeTo;
}

export const on = subscribe;

/**
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
export const subscribeToAll = doForAll(subscribe);

export const onAll = subscribeToAll;
