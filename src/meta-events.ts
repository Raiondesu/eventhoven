import { eventMap, TEventMap, TEventHandler, THandlerOf } from './events';
import { emit } from './emit';
import { TLastParams } from './util';

export const metaEvents = eventMap({
  subscribe(_, eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  unsubscribe(_, eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler) {},
  emit(_, eventMap: TEventMap, eventName: keyof TEventMap, args: any[]) {},
});

export type TMetaEvents = typeof metaEvents;
export type TMetaEmit = typeof emitMeta;

export const emitMeta = <E extends keyof TMetaEvents>(event: E) => (
  ...args: TLastParams<THandlerOf<TMetaEvents, E>>
) => Promise.resolve<void>(
  args[0] !== metaEvents
    ? emit(metaEvents)(event).apply(null, args)
    : void 0
);
