import { mapObject } from './util';
import { TEventMap, TEventSignatures } from './types';

/**
 * Creates an event collection based on handler templates
 *
 * @param events - an object with default handlers for events
 */
export const eventMap = <Events extends TEventSignatures>(
  events: Events
) => <TEventMap<Events>> mapObject(
  events,
  // Actually faster than `new Map([[events[event], () => {}]])`
  // see https://jsperf.com/map-constructor-vs-set/2
  // This might be due to the initialization of iterators in the constructor (https://tc39.es/ecma262/#sec-map-iterable),
  // whereas no iterators are used in the `set` method (https://tc39.es/ecma262/#sec-map.prototype.set).
  event => new Map().set(events[event], () => {
    /* make it impossible to unsubscribe from within the default handler */
  })
);
