import { TEventMap, THandlerOf } from './events';
import { emitMeta } from './meta-events';
import { doForAll, THandlersForAll } from './util';

export type TUnsubscribe<_From = PropertyKey> = () => void;

type TUnsubscribeHandlers<M extends TEventMap, From extends keyof M> = (
  ...handlers: Array<THandlerOf<M, From>>
) => void;

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
