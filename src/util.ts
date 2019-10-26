import { TEventMap, THandlerOf } from './events';

export type TDoAction<P extends any[] = any[], R = void> = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
) => (...args: P) => R;

export type TLastParams<T extends (arg: any, ...args: any[]) => any> = T extends (arg: any, ...args: infer P) => any ? P : [];

/**
 * Maps object values by their keys into a new object
 *
 * Generaly equivalent to `Array.prototype.map()`
 */
export const mapObject = <T extends object, R>(
  obj: T,
  value: (key: keyof T, obj: T) => R
) => (
  <Array<keyof T>>
  Object.keys(obj)
).reduce((newObj, key) => (
  (newObj[key] = value(key, obj)),
  newObj
), <Record<keyof T, R>> {});

/**
 * A `do`-er factory
 *
 * Applies a specified action for all events in a collection
 *
 * @param action - an action to apply
 */
export const doForAll = <A extends TDoAction>(
  action: A
) => <M extends TEventMap>(
  eventMap: M
) => (
  ...args: A extends TDoAction<infer P> ? P : any[]
) => {
  mapObject(eventMap, (key) => action(eventMap)(key).apply(null, args));
};

export type THandlersForAll = {
  <M extends TEventMap>(eventMap: M): {
    (handler: THandlerOf<M>): void;
    (...handlers: THandlerOf<M>[]): void;
  };
};
