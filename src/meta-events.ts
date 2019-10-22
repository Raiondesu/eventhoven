import { eventMap, TEventMap, TEventHandler, THandlerMap } from './events';
import { emit } from './emit';
import { reduceEvents } from './util';

export const metaEvents = eventMap({
  subscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  unsubscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  emit(eventMap: TEventMap, eventName: keyof TEventMap, args: any[]) {},
});

export type TMetaEvents = typeof metaEvents;

const emitMeta = emit(metaEvents);

export const meta = reduceEvents(metaEvents, (eventName) => {
  const emitEvent = emitMeta(eventName);

  return (...args: Parameters<typeof emitEvent>) => {
    if (args[0] !== metaEvents) {
      emitEvent(...args);
    }
  }
}) as THandlerMap<TMetaEvents>;
