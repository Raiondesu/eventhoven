import { TEventMap, THandlerOf, THandlerMap } from './events';
import { meta } from 'meta-events';
import { ISubscribeOptions } from './subscribe';
import { reduceEvents, doForAll, TDoAction } from './util';

export const emit = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
) => (
  ...args: Parameters<THandlerOf<M, E>>
) => {
  const { arity, handlers } = eventMap[event];
  const slicedArgs = arity > 0 ? args.slice(arity) : args;

  // Emit meta-event
  meta.emit(eventMap, event, slicedArgs);

  handlers.forEach((once, handler) => {
    handler?.(<ISubscribeOptions<M, E>>{ event, once }, ...slicedArgs);

    once && handlers.delete(handler);
  });
}

export const emitAll = doForAll(emit as TDoAction);

export const emitCollection = <M extends TEventMap, R = THandlerMap<M>>(
  eventMap: M
): R => reduceEvents(eventMap, emit(eventMap));
