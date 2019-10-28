import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export const unsubscribe = (eventMap) => (event) => (...handlers) => (handlers.length > 0 ? (handlers.forEach((h) => (emitMeta('unsubscribe')(eventMap, event, h),
    eventMap[event].splice(eventMap[event].findIndex(_ => _[0] == h), 1)))) : (eventMap[event].forEach(([h]) => (emitMeta('unsubscribe')(eventMap, event, h))),
    eventMap[event].splice(0)));
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map