import { emitMeta } from "./emit.js";
import { doForAll } from "./util.js";
export const unsubscribe = (eventMap) => (event) => (...handlers) => {
    for (const h of handlers.length > 0
        ? handlers
        : eventMap[event].keys())
        emitMeta("UNSUBSCRIBE")(eventMap, event, h),
            eventMap[event].delete(h);
};
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map