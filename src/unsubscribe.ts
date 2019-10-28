import { TEventMap, THandlerOf } from './events';
import { emitMeta } from './meta-events';
import { doForAll, THandlersForAll } from './util';

export type TUnsubscribe<From = PropertyKey> = () => (
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
) => handlers.length > 0
  ? handlers.forEach(_ => (
      // Emit meta-event (ignore promise)
      emitMeta('unsubscribe')(eventMap, event, _),

      eventMap[event].splice(eventMap[event].findIndex(h => h[0] == _), 1)
    )) as E & void
  : eventMap[event].splice(0).forEach(
      // Emit meta-event (ignore promise)
      h => emitMeta('unsubscribe')(eventMap, event, h[0])
    ) as E & void;

export const off = unsubscribe;

export const unsubscribeFromAll = <THandlersForAll> doForAll(unsubscribe);

export const offAll = unsubscribeFromAll;
