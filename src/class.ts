import { TEventSignatures, TEventMap, TLastParams, THandlerOf } from './types';
import { eventMap } from './events';
import { emit, TEmitReturn } from './emit';
import { on, TSubscriber } from './subscribe';
import { off } from './unsubscribe';

export class Eventhoven<
  T extends TEventSignatures,
  M extends TEventMap<T> = TEventMap<T>
> {
  public readonly map: M;

  constructor(protected events: T) {
    this.map = eventMap(events) as M;
  }

  private apply<F extends (arg1: any) => (arg2: any) => (...args: any[]) => any>(action: F) {
    return (arg, ...args) => action(this.map)(arg)(...args);
  }

  public readonly emit: {
    <E extends keyof T>(event: E, ...args: TLastParams<THandlerOf<M, E>>): TEmitReturn<M ,E>;
   } = this.apply(emit);

  public readonly on: {
    <E extends keyof T>(event: E, ...handlers: Array<THandlerOf<M, E>>): TSubscriber<M, E>;
  } = this.apply(on);

  public readonly off: {
    <E extends keyof T>(event: E, ...handlers: Array<THandlerOf<M, E>>): void;
  } = this.apply(off);

  public static readonly emit = emit;
  public static readonly on = on;
  public static readonly off = off;
}
