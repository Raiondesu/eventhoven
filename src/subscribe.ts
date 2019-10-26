import { TEventMap, THandlerOf } from './events.js';
import { unsubscribe, TUnsubscribe } from './unsubscribe.js';
import { emitMeta, TMetaEmit } from './meta-events.js';
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
  meta: TMetaEmit;
}

/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @param [unsubscribe] - (optional) a custom unsubscribe handler
 * @param [meta] - (optional) a custom meta events handler collection
 * @returns a function that subscribes handlers to a given event in a collection
 */
export const subscribe = <M extends TEventMap>(
  eventMap: M, {
    meta: m,
    unsubscribe: unsub
  }: TSubscriberContext = {
    unsubscribe,
    meta: emitMeta
  }
): {
  <E extends keyof M>(event: E, once?: boolean): TSubscriber<M, E>;
  <S extends ISubscribeOptions<M, keyof M>>(options: S): TSubscriber<M, S['event']>;
} => (
  eventOrOpts: keyof M | ISubscribeOptions<M, keyof M>,
  onceArg: boolean = false
): TSubscriber<M, keyof M> => {
  const event = typeof eventOrOpts === 'object' ? eventOrOpts.event : eventOrOpts;
  const once = typeof eventOrOpts === 'object' ? !!eventOrOpts.once : onceArg;

  return (...handlers: Array<THandlerOf<M>>) => {
    handlers.forEach(handler => {
      // Emit meta-event (ignore promise)
      m('subscribe')(eventMap, event, handler);

      eventMap[event].handlers.set(handler, once);
    });

    return () => unsub(eventMap)(event)
      .apply(null, handlers);
  };
};

export const on = subscribe;

/**
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
export const subscribeToAll = <{
  <M extends TEventMap>(eventMap: M): {
    (handler: THandlerOf<M>): void;
    (...handlers: THandlerOf<M>[]): void;
  }
}> doForAll(subscribe);

export const onAll = subscribeToAll;
