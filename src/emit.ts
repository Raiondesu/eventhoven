import { TEventMap, THandlerOf } from './events.js';
import { emitMeta, TMetaEmit } from './meta-events.js';
import { doForAll, TDoAction, mapObject } from './util.js';

/**
 * Event-emitter factory creator
 *
 * Creates an emitter factory for specific events.
 *
 * @param eventMap - an event collection to create an emitter for
 */
export const emit = <M extends TEventMap>(
  eventMap: M,
  metaEmit: TMetaEmit = emitMeta
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
  const slicedArgs = arity > 0 ? args.slice(0, arity) : args;

  const results: Promise<void>[] = [
    // Emit meta-event
    metaEmit('emit')(eventMap, event, slicedArgs)
  ];

  // Mandates non-blocking flow
  return new Promise(resolve => setTimeout(() => {
    handlers.forEach((once, handler) => {
      results.push(
        Promise.resolve(
          handler.apply(null, slicedArgs)
        )
      );

      once && handlers.delete(handler);
    });

    resolve(Promise.all(results).then(_ => void 0));
  }, 0));
};

/**
 * Emit all events for a given event collection
 *
 * @param eventMap - event collection to emit events for
 *
 * @returns a function that emits all events from a collection with given arguments
 */
export const emitAll = <M extends TEventMap>(
  eventMap: M
) => (eventArgs: {
  [name in keyof M]: Parameters<THandlerOf<M, name>>
}) => mapObject<M, Record<keyof M, Promise<void>>>(
  eventMap,
  (name) => emit(eventMap)(name)
    .apply(null, eventArgs[name])
);
