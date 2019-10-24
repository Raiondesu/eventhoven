import { eventMap, TEventMap, TEventHandler, THandlerOf } from './events.js';
import { emit } from './emit.js';

export const metaEvents = eventMap({
  subscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  unsubscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  emit(eventMap: TEventMap, eventName: keyof TEventMap, args: any[]) {},
});

export type TMetaEvents = typeof metaEvents;
export type TMetaEmit = typeof emitMeta;

export const emitMeta = <E extends keyof TMetaEvents>(event: E) => (
  ...args: Parameters<THandlerOf<TMetaEvents, E>>
) => new Promise<void>(resolve => {
  if (args[0] === metaEvents) {
    return resolve();
  }

  resolve(emit(metaEvents)(event).apply(null, args));
});
