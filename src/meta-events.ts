import { eventMap, TEventMap, TEventHandler } from './events';
import { emit } from './emit';
import { mapObject } from './util';
import { THandlerMap } from './collections';

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
