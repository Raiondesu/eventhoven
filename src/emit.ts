import { TMetaEvents, metaEvents, EMetaEvents } from './meta-events';
import { mapObject } from './util';
import { TEventMap, THandlerOf, TLastParams } from './types';

/**
 * Event-emitter factory creator
 *
 * Creates an emitter factory for specific events.
 *
 * @param eventMap - an event collection to create an emitter for
 */
export const emit = <M extends TEventMap>(
  eventMap: M
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
(...args: TLastParams<THandlerOf<M, E>>): Promise<void> => new Promise<void>(
  (resolve, e) => Promise.all([
    // Emit meta-event
    emitMeta(EMetaEvents.EMIT)(eventMap, event, args),

    ...[...(eventMap[event] || [])].map(
      ([handler, unsubscribe]) => handler
        && handler({ event, unsubscribe }, ...args)
    )
  ]).then(_ => resolve(), e)
);

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
  name => emit(eventMap)(name)(...eventArgs[name])
);

/**
 * Emits a meta-event
 *
 * @param event - a meta-event to emit
 */
export const emitMeta = <E extends EMetaEvents>(event: E) => (
  ...args: TLastParams<THandlerOf<TMetaEvents, E>>
): Promise<void> => args[0] !== metaEvents
  ? emit(metaEvents)(event)(...args)
  : Promise.resolve();
