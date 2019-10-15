import { TEventMap, THandlerOf } from './events';
import { unsubscribe } from './unsubscribe';
import { meta } from './meta-events';

export interface ISubscribeOptions<M extends TEventMap, N extends keyof M> {
  name: N;
  once?: boolean;
}

export interface ISubscribeHandler<M extends TEventMap, N extends keyof M> extends ISubscribeOptions<M, N> {
  handler: THandlerOf<M[N]> | THandlerOf<M[N]>[];
}

export type TUnsubscribe<From> = () => (From & void);
export type TSubscriber<M extends TEventMap, N extends keyof M> = (...handlers: THandlerOf<M[N]>[]) => TUnsubscribe<N>;

const isHandlerOpts = <M extends TEventMap, N extends keyof M>(
  v: ISubscribeHandler<M, N> | ISubscribeOptions<M, N>
): v is ISubscribeHandler<M, N> => typeof v.name === 'string' && (false
  || typeof (v as ISubscribeHandler<M, N>).handler === 'function'
  || Array.isArray((v as ISubscribeHandler<M, N>).handler)
);

export function subscribe<M extends TEventMap>(
  eventMap: M
) {
  const subscribeHandlers = (event: keyof M, once: boolean) => (
    ...handlers: THandlerOf<M[keyof M]>[]
  ) => {
    if (!eventMap[event]) {
      // Soft handle type mismatch
      eventMap[event] = <M[keyof M]> new Map();
    }

    handlers.forEach(handler => {
      if (handler && !eventMap[event].has(handler)) {
        // Emit meta-event
        meta.subscribe(eventMap, event as keyof TEventMap, handler);

        eventMap[event].set(handler, once);
      }
    });

    return () => unsubscribe(eventMap)(event)
      .apply(null, handlers);
  };

  function subscribeTo<S extends ISubscribeHandler<M, keyof M>>(options: S): TUnsubscribe<S['name']>;
  function subscribeTo<S extends ISubscribeOptions<M, keyof M>>(options: S): TSubscriber<M, S['name']>;
  function subscribeTo<E extends keyof M>(event: E, once?: boolean): TSubscriber<M, E>;
  function subscribeTo(
    eventOrOpts: keyof M | ISubscribeOptions<M, keyof M> | ISubscribeHandler<M, keyof M>,
    onceArg: boolean = true
  ) {
    const event = typeof eventOrOpts === 'object' ? eventOrOpts.name : eventOrOpts;
    const once = typeof eventOrOpts === 'object' ? !!eventOrOpts.once : onceArg;
    const sub = subscribeHandlers(event, once);

    if (typeof eventOrOpts !== 'object' || !isHandlerOpts(eventOrOpts)) {
      return sub;
    }

    return sub.apply(
      null,
      Array.isArray(eventOrOpts.handler)
        ? (eventOrOpts.handler)
        : [eventOrOpts.handler]
    );
  }

  return subscribeTo;
}

export const on = subscribe;
