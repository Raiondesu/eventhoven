import { emitMeta } from "./emit.js";
export const unsubscribe = (eventMap) => (event) => (...handlers) => {
    if (event in eventMap)
        for (const h of handlers.length > 0
            ? handlers
            : eventMap[event].keys())
            emitMeta("UNSUBSCRIBE")(eventMap, event, h),
                eventMap[event].delete(h);
};
export const off = unsubscribe;
//# sourceMappingURL=unsubscribe.js.map