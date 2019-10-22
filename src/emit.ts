import { TEventMap, THandlerOf, THandlerMap } from './events';
import { meta, TMetaEmitters } from 'meta-events';
import { ISubscribeOptions } from './subscribe';
import { mapObject, doForAll, TDoAction } from './util';

/**
 * Event-emitter factory creator
 *
 * Creates an emitter factory for specific events.
 *
 * @param eventMap - an event collection to create an emitter for
 */
export const emit = <M extends TEventMap>(
  eventMap: M,
  m: TMetaEmitters = meta
) =>
/**
 * Emitter factory for a specific event collection
 *
 * Creates an emitter for a specific event
 *
 * @param event - the name of the event to emit
 */
<E extends keyof M>(event: E) =>
/**
 * Emits an event with proper arguments
 */
(...args: Parameters<THandlerOf<M, E>>) => {
  const { arity, handlers } = eventMap[event];
  const slicedArgs = arity > 0 ? args.slice(arity) : args;

  // Emit meta-event
  m.emit(eventMap, event, slicedArgs);

  handlers.forEach((once, handler) => {
    handler(<ISubscribeOptions<M, E>>{ event, once }, ...slicedArgs);

    once && handlers.delete(handler);
  });
};

/**
 * Emit all events for a given event collection
 *
 * @param eventMap - event collection to emit events for
 *
 * @returns a function that emits all events from a collection with given arguments
 */
export const emitAll = doForAll(emit as TDoAction);

/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export const emitCollection = <M extends TEventMap, R = THandlerMap<M>>(
  eventMap: M
): R => mapObject(eventMap, emit(eventMap));
