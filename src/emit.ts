import { TEventMap, THandlerOf, THandlerMap } from './events';
import { metaEventMap, meta } from 'meta-events';

export const emit = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
) => (
  ...args: Parameters<THandlerOf<M[E]>>
) => {
  const handlers = eventMap[event];

  // Prevent infinite meta-event recursion from occuring
  if (eventMap !== metaEventMap as TEventMap) {
    // Emit meta-event
    meta.emit(eventMap, event, args);
  }

  handlers?.forEach((once, handler) => {
    handler?.(...args)

    once && handlers.delete(handler);
  });
}

export const emitCollection = <M extends TEventMap, R = THandlerMap<M>>(
  eventMap: M
): R => {
  const emitCollectionEvent = emit(eventMap);

  return (
    <Array<keyof M>>
    Object.keys(eventMap)
  ).reduce((obj, event) => ({
    ...obj,
    [event]: emitCollectionEvent(event),
  }), {} as R);
}
