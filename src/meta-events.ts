import { eventMap, TEventMap, TEventHandler } from './events';
import { emitCollection } from './emit';

export type TMetaHandlerMap = {
  subscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler): void;
  unsubscribe(eventMap: TEventMap, eventName: keyof TEventMap, handler: TEventHandler): void;
  emit(eventMap: TEventMap, eventName: keyof TEventMap, args: any[]): void;
};

export const metaEventMap = eventMap<TMetaHandlerMap>(
  // We have to, unfortunately, duplicate keys from the TMetaHandlerMap type
  // due to the absence of runtime types in TS
  'subscribe',
  'unsubscribe'
);

export type TMetaEventMap = typeof metaEventMap;

export const meta = emitCollection<TMetaEventMap, TMetaHandlerMap>(metaEventMap);
