import { metaEvents } from './meta-events.js';
import { subscribeCollection, unsubscribeCollection } from './collections.js';
import { mapObject } from './util.js';
const metaSub = subscribeCollection(metaEvents);
const metaUnsub = unsubscribeCollection(metaEvents);
const log = (type) => (_map, event, argsOrHandler) => console.log(`${new Date().toLocaleTimeString()} [EVENT ${type.toUpperCase()} "${String(event)}"]: ${Array.isArray(argsOrHandler)
    ? argsOrHandler.join(', ')
    : argsOrHandler}`);
/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param {boolean} enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
export const debug = (enable) => {
    mapObject(metaEvents, (name) => (enable ? metaSub : metaUnsub)[name](log(name)));
};
//# sourceMappingURL=debug.js.map