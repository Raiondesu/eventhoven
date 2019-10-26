import { mapObject, TLastParams } from './util';
import { ISubscribeOptions } from './subscribe';

type TEventHandlerData<Event extends TEventHandler> = {
  arity: number;
  handlers: Map<Event, boolean>;
};

export type TEventMap<Events extends TEventSignatures = TEventSignatures> = {
  readonly [event in keyof Events]: TEventHandlerData<Events[event]>;
};

export type TEventHandler<M extends TEventMap = TEventMap> = (
  context: ISubscribeOptions<M>,
  ...args: any[]
) => void | Promise<void>;

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
  (key, obj) => ({
    arity: obj[key].length,
    handlers: new Map([[obj[key], false]]),
  })
);
