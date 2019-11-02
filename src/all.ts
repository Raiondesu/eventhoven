import { mapObject, TDoAction } from './util';
import { TEventMap, THandlerOf, TLastParams } from './types';
import { emit } from './emit';
import { subscribe } from './subscribe';
import { unsubscribe } from './unsubscribe';

/**
 * A `do`-er factory
 *
 * Applies a specified action for all events in a collection
 *
 * @param action - an action to apply
 */
const doForAll = <A extends TDoAction>(
  action: A
) => <M extends TEventMap>(
  eventMap: M
) => (
  ...args: A extends TDoAction<infer P> ? P : any[]
) => {
  mapObject(eventMap, key => action(eventMap)(key)(...args));
};

type THandlersForAll = {
  <M extends TEventMap>(eventMap: M): {
    (handler: THandlerOf<M>): void;
    (...handlers: THandlerOf<M>[]): void;
  };
};

type TEventParamsMap<M extends TEventMap> = {
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
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
export const subscribeToAll = <THandlersForAll> doForAll(subscribe);
export const onAll = subscribeToAll;

export const unsubscribeFromAll = <THandlersForAll> doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
