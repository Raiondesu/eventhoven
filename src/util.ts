import { TEventMap } from './types';

/**
 * Maps object values by their keys into a new object
 *
 * Generaly equivalent to `Array.prototype.map()`
 */
export const mapObject = <T extends object, R>(
  obj: T,
  value: (key: keyof T) => R
) => (
  <Array<keyof T>>
  [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]
).reduce((newObj, key) => (
  newObj[key] = value(key), newObj
), <Record<keyof T, R>> {});

export type TDoAction<P extends any[] = any[], R = void> = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
) => (...args: P) => R;
