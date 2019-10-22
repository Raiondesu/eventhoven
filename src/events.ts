import { mapObject } from './util';

type TEventHandlerData<Event extends TEventHandler> = {
  arity: number;
  handlers: Map<Event, boolean>;
};

export type TEventMap<Events extends TEventOptions = TEventOptions> = {
  readonly [event in keyof Events]: TEventHandlerData<Events[event]>;
};

export type TEventHandler = (...args: any[]) => void | Promise<void>;
export type TEventHandlerFrom<H extends TEventHandler> = (...args: Parameters<H>) => Promise<void>;

export type THandlerOf<
  M extends TEventMap,
  N extends keyof M = keyof M,
  EventValue extends M[N] = M[N]
> = EventValue extends TEventHandlerData<infer H>
  ? H
  : M[keyof M] extends TEventHandlerData<infer H>
    ? H
    : TEventHandler;

export type TEventOptions = {
  [name in PropertyKey]: TEventHandler;
}

/**
 * Creates an event collection based on handler templates
 *
 * @param events - an object with default handlers for events
 */
export const eventMap = <Events extends TEventOptions>(
  events: Events
): TEventMap<Events> => mapObject(
  events,
  (key, obj) => ({
    arity: obj[key].length,
    handlers: new Map([[obj[key], false]]),
  })
);
