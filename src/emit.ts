import { TEventMap, THandlerOf } from './events';
import { emitMeta, TMetaEmit } from './meta-events';
import { mapObject, TLastParams } from './util';

// Redeclare setTimeout to be both node and browser types (instead of overloads)
// to ensure the code works on both platforms
declare const setTimeout:
  | Window['setTimeout']
  | ((callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timeout);

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
(...args: TLastParams<THandlerOf<M, E>>): Promise<void> => {
  const { arity, handlers } = eventMap[event];
  const slicedArgs = arity > 0 ? args.slice(0, arity) : args;

  const results: Promise<void>[] = [
    // Emit meta-event
    metaEmit('emit')(eventMap, event, slicedArgs)
  ];

  // Mandates non-blocking flow
  return new Promise<void>(resolve => setTimeout(() => {
    handlers.forEach((once, handler) => {
      results.push(
        Promise.resolve(
          handler && handler({ event, once }, ...slicedArgs)
        )
      );

      once && handlers.delete(handler);
    });

    resolve(Promise.all(results).then(_ => void 0));
  }, 0));
};

export type TEventParamsMap<M extends TEventMap> = {
  [name in keyof M]: TLastParams<THandlerOf<M, name>>;
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
) => (
  eventArgs: TEventParamsMap<M>
) => mapObject<M, Promise<void>>(
  eventMap,
  (name) => emit(eventMap)(name)
    .apply(null, eventArgs[name])
);
