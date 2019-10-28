import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export const unsubscribe = (eventMap) => (event) => (...handlers) => handlers.length > 0
    ? handlers.forEach(_ => (emitMeta('unsubscribe')(eventMap, event, _),
        eventMap[event].splice(eventMap[event].findIndex(h => h[0] == _), 1)))
    : eventMap[event].splice(0).forEach(h => emitMeta('unsubscribe')(eventMap, event, h[0]));
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map