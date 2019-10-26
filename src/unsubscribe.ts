import { TEventMap, THandlerOf } from './events';
import { emitMeta } from './meta-events';
import { doForAll, THandlersForAll } from './util';

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
  eventMap: M
) => <E extends keyof M>(
  event: E
): TUnsubscribeHandlers<M, E> => (
  ...handlers
) => (
  handlers.length > 0 ? (
    handlers.forEach(h => (
      // Emit meta-event (ignore promise)
      emitMeta('unsubscribe')(eventMap, event, h),

      eventMap[event].delete(h)
    ))
  ) : (
    eventMap[event].forEach((_, h) => (
      // Emit meta-event (ignore promise)
      emitMeta('unsubscribe')(eventMap, event, h)
    )),
    eventMap[event].clear()
  )
) as E & void;

export const off = unsubscribe;

export const unsubscribeFromAll = <THandlersForAll> doForAll(unsubscribe);

export const offAll = unsubscribeFromAll;
