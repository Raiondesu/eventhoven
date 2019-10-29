import { eventMap } from './events';
import { TEventMap, TEventHandler } from './types';

export const enum EMetaEvents {
  /**
   * Emitted when any event is emitted, except itself
   */
  EMIT = 'EMIT',

  /**
   * Emitted when any event is subscribed to, except itself
   */
  SUBSCRIBE = 'SUBSCRIBE',

  /**
   * Emitted when any event is unsubscribed from, except itself
   */
  UNSUBSCRIBE = 'UNSUBSCRIBE',
}

export const metaEvents = eventMap({
  [EMetaEvents.EMIT](_, _map: TEventMap, _event: keyof TEventMap, _args: any[]) {},
  [EMetaEvents.SUBSCRIBE](_, _map: TEventMap, _event: keyof TEventMap, _handler: TEventHandler) {},
  [EMetaEvents.UNSUBSCRIBE](_, _map: TEventMap, _event: keyof TEventMap, _handler: TEventHandler) {},
});

export type TMetaEvents = typeof metaEvents;
