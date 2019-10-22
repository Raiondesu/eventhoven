import { TEventMap, THandlerOf } from './events';
import { unsubscribe, TUnsubscribe } from './unsubscribe';
import { meta } from './meta-events';
import { doForAll } from './util';

export interface ISubscribeOptions<M extends TEventMap, N extends keyof M> {
  event: N;
  once?: boolean;
}

export type TSubscriber<M extends TEventMap, N extends keyof M> = {
  (handler: THandlerOf<M, N>): TUnsubscribe<N>;
  (...handlers: Array<THandlerOf<M, N>>): TUnsubscribe<N>;
};

export function subscribe<M extends TEventMap>(
  eventMap: M
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

      // Emit meta-event
      meta.subscribe(eventMap, event as keyof TEventMap, handler);

      eventMap[event].handlers.set(handler, once);
    });

    return () => unsubscribe(eventMap)(event)
      .apply(null, handlers);
  };

  function subscribeTo<S extends ISubscribeOptions<M, keyof M>>(options: S): TSubscriber<M, S['event']>;
  function subscribeTo<E extends keyof M>(event: E, once?: boolean): TSubscriber<M, E>;
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

export const subscribeToAll = doForAll(subscribe);

export const onAll = subscribeToAll;
