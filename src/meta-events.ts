import { eventMap, TEventMap, TEventHandler, THandlerOf } from './events';
import { emit } from './emit';
import { TLastParams } from './util';

export const metaEvents = eventMap({
  subscribe(_, _eventMap: TEventMap, _eventName: keyof TEventMap, _handler: TEventHandler) {},
  unsubscribe(_, _eventMap: TEventMap, _eventName: keyof TEventMap, _handler: TEventHandler) {},
  emit(_, _eventMap: TEventMap, _eventName: keyof TEventMap, _args: any[]) {},
});

export type TMetaEvents = typeof metaEvents;
export type TMetaEmit = typeof emitMeta;

export const emitMeta = <E extends keyof TMetaEvents>(event: E) => (
  ...args: TLastParams<THandlerOf<TMetaEvents, E>>
): Promise<void> => Promise.resolve(
  args[0] !== metaEvents
    ? emit(metaEvents)(event).apply(null, args)
    : void 0
);
