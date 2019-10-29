import { mapObject, TLastParams } from './util';
import { TUnsubscribe } from './unsubscribe';

export type TEventHandlerData<Event extends TEventHandler> = Map<Event, TUnsubscribe>;

export type TEventMap<Events extends TEventSignatures = TEventSignatures> = {
  readonly [event in keyof Events]: TEventHandlerData<Events[event]>;
};

export type TEventHandler<M extends TEventMap = TEventMap> = (
  context: TEventOptions<M>,
  ...args: any[]
) => void | Promise<void>;

export type TEventOptions<M extends TEventMap, N extends keyof M = keyof M> = {
  event: N;
  unsubscribe: TUnsubscribe<N>;
};

export type TEventHandlerFrom<H extends TEventHandler> = (...args: Parameters<H>) => Promise<void>;

export type TContextHandler<T extends TEventHandler> = (...args: TLastParams<T>) => ReturnType<T>;

export type THandlerOf<
  M extends TEventMap,
  N extends keyof M = keyof M,
  EventValue extends M[N] = M[N]
> = EventValue extends TEventHandlerData<infer H>
  ? H
  : M[keyof M] extends TEventHandlerData<infer H>
    ? H
    : TEventHandler;

export type TEventSignatures<Events extends PropertyKey = PropertyKey> = {
  [name in Events]: TEventHandler;
};

/**
 * Creates an event collection based on handler templates
 *
 * @param events - an object with default handlers for events
 */
export const eventMap = <Events extends TEventSignatures>(
  events: Events
) => <TEventMap<Events>> mapObject(
  events,
  key => new Map([[events[key], () => {
    /* make it impossible to unsubscribe from the default handler */
  }]])
);
