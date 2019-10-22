import { TEventMap } from './events';

export const reduceEvents = <T extends object, R extends Record<keyof T, any>>(
  obj: T, value: (key: keyof T, obj: T) => R[keyof T], defaultValue: R = {} as R
) => (
  <Array<keyof T>>
  Object.keys(obj)
).reduce((newObj, key) => {
  newObj[key] = value(key, obj);

  return newObj;
}, defaultValue);

export type TDoAction<P extends any[] = any[]> = <M extends TEventMap>(
  eventMap: M
) => <E extends keyof M>(
  event: E
) => (...args: P) => void;

export const doForAll = <A extends TDoAction>(
  action: A
) => <M extends TEventMap>(
  eventMap: M
) => {
  const mappedAction = action(eventMap);

  return (
    ...args: A extends TDoAction<infer P> ? P : any[]
  ) => {
    reduceEvents(eventMap, (key) => mappedAction(key)(...args));
  };
}
