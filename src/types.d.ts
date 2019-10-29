export type TUnsubscribe<_From = PropertyKey> = () => void;

export type TUnsubscribeHandlers<M extends TEventMap, From extends keyof M> = (
  ...handlers: Array<THandlerOf<M, From>>
) => void;

export type TEventSignatures<Events extends PropertyKey = PropertyKey> = {
  [name in Events]: TEventHandler;
};

export type TEventMap<Events extends TEventSignatures = TEventSignatures> = {
  readonly [event in keyof Events]: TEventHandlerData<Events[event]>;
};

export type THandlerOf<
  M extends TEventMap,
  N extends keyof M = keyof M,
  EventValue extends M[N] = M[N]
> = EventValue extends TEventHandlerData<infer H>
  ? H
  : M[keyof M] extends TEventHandlerData<infer H>
    ? H
    : TEventHandler;

export type TEventHandlerData<Event extends TEventHandler> = Map<Event, TUnsubscribe>;

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

export type TLastParams<T extends (arg: any, ...args: any[]) => any> = T extends (arg: any, ...args: infer P) => any ? P : [];

