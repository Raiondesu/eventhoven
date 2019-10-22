import { mapObject } from './util';
/**
 * Creates an event collection based on handler templates
 *
 * @param events - an object with default handlers for events
 */
export const eventMap = (events) => mapObject(events, (key, obj) => ({
    arity: obj[key].length,
    handlers: new Map([[obj[key], false]]),
}));
//# sourceMappingURL=events.js.map