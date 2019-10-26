import { metaEvents } from "./meta-events.js";
import { onAll } from "./subscribe.js";
import { offAll } from "./unsubscribe.js";
const onMeta = onAll(metaEvents);
const offMeta = offAll(metaEvents);
/**
 * Default logging function
 */
const log = ({ event }, _map, eventName, argsOrHandler) => console.log(`${new Date().toISOString().match(/T(.*?)Z/)[1]} [EVENT ${event.toUpperCase()} "${String(eventName)}"] - ${Array.isArray(argsOrHandler)
    ? argsOrHandler.join(', ')
    : argsOrHandler}`);
/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
export const debug = ({ enable, log: logEvent }) => (enable ? onMeta : offMeta)(logEvent || log);
//# sourceMappingURL=debug.js.map