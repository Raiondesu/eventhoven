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
  event => new Map().set(events[event], () => {
    /* make it impossible to unsubscribe from the default handler */
  })
);
