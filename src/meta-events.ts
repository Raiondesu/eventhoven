import { eventMap, TEventMap, TEventHandler, THandlerOf } from './events';
import { emit } from './emit';

export const metaEvents = eventMap({
  subscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  unsubscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  emit(eventMap: TEventMap, eventName: keyof TEventMap, args: any[]) {},
});

export type TMetaEvents = typeof metaEvents;
export type TMetaEmit = typeof emitMeta;

export const emitMeta = <E extends keyof TMetaEvents>(event: E) => (
  ...args: Parameters<THandlerOf<TMetaEvents, E>>
) => Promise.resolve<void>(
  args[0] !== metaEvents
    ? emit(metaEvents)(event).apply(null, args)
    : void 0
);
