import { TEventMap, THandlerOf } from './events';
import { meta, TMetaEmitters } from './meta-events';
import { doForAll, TDoAction, mapObject } from './util';

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
(...args: Parameters<THandlerOf<M, E>>): Promise<void> => {
  const { arity, handlers } = eventMap[event];
  const slicedArgs = arity > 0 ? args.slice(arity) : args;

  const results: Promise<void>[] = [
    // Emit meta-event
    m.emit(eventMap, event, slicedArgs)
  ];

  handlers.forEach((once, handler) => {
    results.push(
      Promise.resolve(
        handler(...slicedArgs)
      )
    );

    once && handlers.delete(handler);
  });

  return Promise.all(results).then(_ => void 0);
};

/**
 * Emit all events for a given event collection
 *
 * @param eventMap - event collection to emit events for
 *
 * @returns a function that emits all events from a collection with given arguments
 */
export const emitAll = doForAll(emit as TDoAction);
