import { TEventMap, THandlerOf } from './events';
import { meta } from './meta-events';

export const unsubscribe = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
) => (
  ...handlers: THandlerOf<M[E]>[]
) => handlers.forEach(_ => (
  // Emit meta-event
  meta.unsubscribe(eventMap, event, _),
  eventMap[event]?.delete(_)
));

export const off = unsubscribe;
