import { mapObject } from './util.js';
/**
 * Creates an event collection based on handler templates
 *
 * @param events - an object with default handlers for events
 */
export var eventMap = function (events) { return mapObject(events, function (key, obj) { return ({
    arity: obj[key].length,
    handlers: new Map([[obj[key], false]]),
}); }); };
//# sourceMappingURL=events.js.map