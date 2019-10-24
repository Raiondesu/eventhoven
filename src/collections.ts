import { TEventMap, TEventHandlerFrom, THandlerOf } from './events.js';
import { mapObject, TDoAction } from './util.js';
import { emit } from './emit.js';
import { subscribe } from './subscribe.js';
import { unsubscribe } from './unsubscribe.js';

export type THandlerMap<M extends TEventMap> = {
  [event in keyof M]: TEventHandlerFrom<THandlerOf<M, event>>;
};

export type THandlersMap<M extends TEventMap> = {
  [event in keyof M]: (...handlers: THandlerOf<M, event>[]) => void;
};

export type TEventCollection<M extends TEventMap> = {
  emit: THandlerMap<M>;
  subscribe: THandlersMap<M>;
  unsubscribe: THandlersMap<M>;
};

const createCollection = <A extends TDoAction>(
  action: A
) => <M extends TEventMap>(
  eventMap: M
) => mapObject(
  eventMap,
  action(eventMap)
);

// TODO - remove type-casting

/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export const emitCollection = <{
  <M extends TEventMap>(eventMap: M): THandlerMap<M>;
}> createCollection(emit as TDoAction<any[]>);

/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
export const subscribeCollection = <{
  <M extends TEventMap>(eventMap: M): THandlersMap<M>;
}> createCollection(subscribe);

/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
export const unsubscribeCollection = <{
  <M extends TEventMap>(eventMap: M): THandlersMap<M>;
}> createCollection(unsubscribe);

/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
export const eventCollection = <M extends TEventMap>(
  eventMap: M
): TEventCollection<M> => ({
  emit: emitCollection(eventMap),
  subscribe: subscribeCollection(eventMap),
  unsubscribe: unsubscribeCollection(eventMap),
});
