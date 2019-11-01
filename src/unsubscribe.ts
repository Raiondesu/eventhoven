import { emitMeta } from './emit';
import { doForAll, THandlersForAll } from './util';
import { TEventMap, TUnsubscribeHandlers } from './types';
import { EMetaEvents } from './meta-events';

export const unsubscribe = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
): TUnsubscribeHandlers<M, E> => (
  ...handlers
) => {
  if (event in eventMap) for (
    const h of handlers.length > 0
      ? handlers
      : eventMap[event].keys()
  )
    // Emit meta-event (ignore promise)
    emitMeta(EMetaEvents.UNSUBSCRIBE)(eventMap, event, h),
    eventMap[event].delete(h);
};

export const off = unsubscribe;

export const unsubscribeFromAll = <THandlersForAll> doForAll(unsubscribe);

export const offAll = unsubscribeFromAll;
