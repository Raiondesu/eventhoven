import { eventMap, TEventMap, TEventHandler } from './events.js';
import { emit } from './emit.js';
import { mapObject } from './util.js';
import { THandlerMap } from './collections.js';

export const metaEvents = eventMap({
  subscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  unsubscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  emit(eventMap: TEventMap, eventName: keyof TEventMap, args: any[]) {},
});

export type TMetaEvents = typeof metaEvents;
export type TMetaEmitters = THandlerMap<TMetaEvents>;

const emitMeta = emit(metaEvents);

export const meta = mapObject(metaEvents, (eventName) => {
  const emitEvent = emitMeta(eventName);

  return (...args: Parameters<typeof emitEvent>) => new Promise<void>(_ => {
    if (args[0] === metaEvents) {
      return _();
    }

    return _(emitEvent(...args));
  });
}) as TMetaEmitters;
