import { TEventSignatures, TEventMap } from './types';
import { TEventCollection, eventCollection } from './collections';
import { eventMap } from './events';
import { emit } from './emit';
import { on } from './subscribe';
import { off } from './unsubscribe';

export class Eventhoven<T extends TEventSignatures> {
  public readonly map: TEventMap<T>;

  constructor(
    protected events: T
  ) {
    this.map = eventMap(events);

    const collection = eventCollection(this.map);

    this.emit = collection.emit;
    this.on = collection.subscribe;
    this.off = collection.unsubscribe;
  }

  public readonly emit: TEventCollection<TEventMap<T>>['emit'];
  public readonly on: TEventCollection<TEventMap<T>>['subscribe'];
  public readonly off: TEventCollection<TEventMap<T>>['unsubscribe'];

  public static readonly emit = emit;
  public static readonly on = on;
  public static readonly off = off;
}

