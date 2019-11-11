import { metaEvents } from "./meta-events.js";
import { onAll, offAll } from "./all.js";
const onMeta = onAll(metaEvents);
const offMeta = offAll(metaEvents);
const log = ({ event }, map, eventName, argsOrHandler) => console.log(new Date().toJSON().substr(14, 9), `[${event} "${String(eventName)}"${eventName in map ? '' : ' (INVALID)'}] -`, argsOrHandler);
export const customDebug = (logEvent) => (enable) => (enable ? onMeta : offMeta)(logEvent);
export const debug = customDebug(log);
//# sourceMappingURL=debug.js.map