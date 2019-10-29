import { eventMap } from './events';
import { TEventMap, TEventHandler } from './types';

export const metaEvents = eventMap({
  subscribe(_, _eventMap: TEventMap, _eventName: keyof TEventMap, _handler: TEventHandler) {},
  unsubscribe(_, _eventMap: TEventMap, _eventName: keyof TEventMap, _handler: TEventHandler) {},
  emit(_, _eventMap: TEventMap, _eventName: keyof TEventMap, _args: any[]) {},
});

export type TMetaEvents = typeof metaEvents;
