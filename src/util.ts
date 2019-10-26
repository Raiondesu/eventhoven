import { TEventMap } from './events';

export type TDoAction<P extends any[] = any[], R = void> = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
) => (...args: P) => R;

/**
 * Maps object values by their keys into a new object
 *
 * Generaly equivalent to `Array.prototype.map()`
 */
export const mapObject = <T extends object, R>(
  obj: T,
  value: (key: keyof T, obj: T) => R,
  defaultValue = <Record<keyof T, R>> {}
) => (
  <Array<keyof T>>
  Object.keys(obj)
).reduce((newObj, key) => (
  (newObj[key] = value(key, obj)),
  newObj
), defaultValue);

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
