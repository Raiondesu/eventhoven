import { TEventSignatures, TEventMap, TLastParams, THandlerOf } from './types';
import { eventMap } from './events';
import { emit } from './emit';
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

  public emit<E extends keyof T>(event: E, ...args: TLastParams<THandlerOf<M, E>>) {
    return emit(this.map)(event)(...args);
  }

  public on<E extends keyof T>(event: E, ...handlers: Array<THandlerOf<M, E>>) {
    return on(this.map)(event)(...handlers);
  }

  public off<E extends keyof T>(event: E, ...handlers: Array<THandlerOf<M, E>>) {
    return off(this.map)(event)(...handlers);
  }

  public static readonly emit = emit;
  public static readonly on = on;
  public static readonly off = off;
}
