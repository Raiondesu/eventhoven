import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export const unsubscribe = (eventMap) => (event) => (...handlers) => (handlers.length > 0 ? (handlers.forEach(h => (
// Emit meta-event (ignore promise)
emitMeta('unsubscribe')(eventMap, event, h),
    eventMap[event].delete(h)))) : (eventMap[event].forEach((_, h) => (
// Emit meta-event (ignore promise)
emitMeta('unsubscribe')(eventMap, event, h))),
    eventMap[event].clear()));
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map