import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export const unsubscribe = (eventMap, m = emitMeta) => (event) => (...handlers) => (handlers.length > 0 ? (handlers.forEach(h => (
// Emit meta-event (ignore promise)
m('unsubscribe')(eventMap, event, h),
    eventMap[event].handlers.delete(h)))) : (eventMap[event].handlers.forEach((_, h) => (
// Emit meta-event (ignore promise)
m('unsubscribe')(eventMap, event, h))),
    eventMap[event].handlers.clear()));
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map