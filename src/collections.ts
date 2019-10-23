import { TEventMap, TEventHandlerFrom, THandlerOf } from './events.js';
import { mapObject } from './util.js';
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
}

// TODO: reduce code duplication in this module!

/**
 * Create a namespaced event emitter collection
 * with each property of the collection corresponding to emitting a particular event
 *
 * @param eventMap - event collection to emit events for
 */
export const emitCollection = <M extends TEventMap, R = THandlerMap<M>>(
  eventMap: M
): R => mapObject(eventMap, emit(eventMap));

/**
 * Create a namespaced event subscriber collection
 * with each property of the collection corresponding to subscribing to a particular event
 *
 * @param eventMap - event collection to subscribe handlers for
 */
export const subscribeCollection = <M extends TEventMap, R = THandlersMap<M>>(
  eventMap: M
): R => mapObject(eventMap, subscribe(eventMap));

/**
 * Create a namespaced event unsubscriber collection
 * with each property of the collection corresponding to unsubscribing from a particular event
 *
 * @param eventMap - event collection to unsubscribe handlers from
 */
export const unsubscribeCollection = <M extends TEventMap, R = THandlersMap<M>>(
  eventMap: M
): R => mapObject(eventMap, unsubscribe(eventMap));

/**
 * Creates an OOP-style event collection
 *
 * @param eventMap - event map to create a collection from
 */
export const eventCollection = <M extends TEventMap>(
  eventMap: M
): TEventCollection<M> => ({
  emit: emitCollection(eventMap),
  subscribe: mapObject(eventMap, subscribe(eventMap)),
  unsubscribe: unsubscribeCollection(eventMap),
});
