import { TEventMap, THandlerOf } from './events';
import { off, TUnsubscribe } from './unsubscribe';
import { emitMeta, TMetaEmit } from './meta-events';
import { doForAll } from './util';

export interface ISubscribeOptions<M extends TEventMap, N extends keyof M = keyof M> {
  event: N;
  once?: boolean;
}

export type TSubscriber<M extends TEventMap, N extends keyof M> = {
  (handler: THandlerOf<M, N>): TUnsubscribe<N>;
  (...handlers: Array<THandlerOf<M, N>>): TUnsubscribe<N>;
};

type TSubscriberFactory<M extends TEventMap> = {
  <E extends keyof M>(event: E, once?: boolean): TSubscriber<M, E>;
  <S extends ISubscribeOptions<M>>(options: S): TSubscriber<M, S['event']>;
};

/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @param [unsubscribe] - (optional) a custom unsubscribe handler
 * @param [meta] - (optional) a custom meta events handler collection
 * @returns a function that subscribes handlers to a given event in a collection
 */
export const subscribe = <M extends TEventMap>(
  eventMap: M
): TSubscriberFactory<M> => (
  eventOrOpts: keyof M | ISubscribeOptions<M>,
  onceArg: boolean = false
): TSubscriber<M, keyof M> => {
  const event = (<ISubscribeOptions<M>>eventOrOpts).event || eventOrOpts as keyof M;

  return (...handlers: Array<THandlerOf<M>>) => (
    handlers.forEach(handler => {
      // Emit meta-event (ignore promise)
      emitMeta('subscribe')(eventMap, event, handler);

      eventMap[event].set(
        handler,
        (<ISubscribeOptions<M>>eventOrOpts).once || onceArg
      );
    }),

    () => off(eventMap)(event)
      .apply(null, handlers)
  );
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
  };
}> doForAll(subscribe);

export const onAll = subscribeToAll;
