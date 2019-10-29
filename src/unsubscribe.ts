import { emitMeta } from './emit';
import { doForAll, THandlersForAll } from './util';
import { TEventMap, TUnsubscribeHandlers } from './types';

export const unsubscribe = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
): TUnsubscribeHandlers<M, E> => (
  ...handlers
) => {
  for (
    const h of handlers.length > 0
      ? handlers
      : eventMap[event].keys()
  ) // Emit meta-event (ignore promise)
    emitMeta('unsubscribe')(eventMap, event, h),
    eventMap[event].delete(h);
};

export const off = unsubscribe;

export const unsubscribeFromAll = <THandlersForAll> doForAll(unsubscribe);

export const offAll = unsubscribeFromAll;
