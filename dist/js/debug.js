import { onAll } from './subscribe';
import { offAll } from './unsubscribe';
import { metaEvents } from './meta-events';
var onMeta = onAll(metaEvents);
var offMeta = offAll(metaEvents);
var log = function (map, event, argsOrHandler) { return console.log(new Date().toTimeString() + " [EVENT \"" + String(event) + "\"]: " + argsOrHandler + " from " + map); };
/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param {boolean} enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
export var debug = function (enable) { return (enable ? onMeta : offMeta)(log); };
//# sourceMappingURL=debug.js.map