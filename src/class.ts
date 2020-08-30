import { TEventSignatures, TEventMap, TLastParams, THandlerOf, TUnsubscribe } from './types';
import { eventMap } from './events';
import { emit, TEmitReturn } from './emit';
import { on } from './subscribe';
import { off } from './unsubscribe';

export class Eventhoven<
  T extends TEventSignatures,
  M extends TEventMap<T> = TEventMap<T>
> {
  public readonly map: M;

  constructor(protected events: T) {
    this.map = eventMap(events) as M;
  }

  public emit<E extends keyof T>(event: E, ...args: TLastParams<THandlerOf<M, E>>): TEmitReturn<M, E> {
    return emit(this.map)(event)(...args);
  }

  public on<E extends keyof T>(event: E, ...handlers: Array<THandlerOf<M, E>>): TUnsubscribe<E> {
    return on(this.map)(event)(...handlers);
  }

  public off<E extends keyof T>(event: E, ...handlers: Array<THandlerOf<M, E>>): this {
    off(this.map)(event)(...handlers);

    return this;
  }

  public static emit<
    T extends TEventSignatures,
    M extends TEventMap<T>,
    E extends keyof T
  >(eventMap: M | Eventhoven<T, M>, event: E, ...args: TLastParams<THandlerOf<M, E>>): TEmitReturn<M, E> {
    return emit(
      eventMap instanceof Eventhoven
        ? eventMap.map
        : eventMap
    )(event)(...args);
  }

  public static on<
    T extends TEventSignatures,
    M extends TEventMap<T>,
    E extends keyof T
  >(eventMap: M | Eventhoven<T, M>, event: E, ...handlers: Array<THandlerOf<M, E>>): TUnsubscribe<E> {
    return on(
      eventMap instanceof Eventhoven
        ? eventMap.map
        : eventMap
    )(event)(...handlers);
  }

  public static off<
    T extends TEventSignatures,
    M extends TEventMap<T>,
    E extends keyof T
  >(eventMap: M | Eventhoven<T, M>, event: E, ...handlers: Array<THandlerOf<M, E>>): void {
    return off(
      eventMap instanceof Eventhoven
        ? eventMap.map
        : eventMap
    )(event)(...handlers);
  }
}
