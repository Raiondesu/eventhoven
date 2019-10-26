import { TEventMap, THandlerOf } from './events.js';
import { emitMeta, TMetaEmit } from './meta-events.js';
import { doForAll } from './util.js';

export type TUnsubscribe<From> = () => (
  // Lifehack to display the event name
  // on the unsubscribe function
  From & void
);

type TUnsubscribeHandlers<M extends TEventMap, From extends keyof M> = (
  ...handlers: Array<THandlerOf<M, From>>
) => (
  // Lifehack to display the event name
  // on the unsubscribe function
  From & void
);

export const unsubscribe = <M extends TEventMap>(
  eventMap: M,
  m: TMetaEmit = emitMeta
) => <E extends keyof M>(
  event: E
): TUnsubscribeHandlers<M, E> => (
  ...handlers
) => (
  handlers.length > 0 ? (
    handlers.forEach(h => (
      // Emit meta-event (ignore promise)
      m('unsubscribe')(eventMap, event, h),

      eventMap[event].handlers.delete(h)
    ))
  ) : (
    eventMap[event].handlers.forEach((_, h) => (
      // Emit meta-event (ignore promise)
      m('unsubscribe')(eventMap, event, h)
    )),
    eventMap[event].handlers.clear()
  )
) as E & void;

export const off = unsubscribe;

export const unsubscribeFromAll = <{
  <M extends TEventMap>(eventMap: M): {
    (handler: THandlerOf<M>): void;
    (...handlers: THandlerOf<M>[]): void;
  };
}> doForAll(unsubscribe);

export const offAll = unsubscribeFromAll;
