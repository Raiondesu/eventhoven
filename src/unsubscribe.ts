import { TEventMap, THandlerOf } from './events';
import { meta, TMetaEmitters } from './meta-events';
import { doForAll } from './util';

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
  m: TMetaEmitters = meta,
) => <E extends keyof M>(
  event: E
): TUnsubscribeHandlers<M, E> => (
  ...handlers
) => handlers.forEach(_ => (
  // Emit meta-event
  m.unsubscribe(eventMap, event, _),

  eventMap[event]?.handlers.delete(_)
)) as E & void;

export const off = unsubscribe;

export const unsubscribeFromAll = doForAll(unsubscribe);

export const offAll = unsubscribeFromAll;
