import { emitMeta } from "./meta-events.js";
import { mapObject } from "./util.js";
export const emit = (eventMap) => (event) => (...args) => new Promise((resolve, e) => setTimeout(() => Promise.all([
    emitMeta('emit')(eventMap, event, args),
    ...eventMap[event]
        .map(([handler, unsubscribe]) => handler && handler
        .bind(null, { event, unsubscribe })
        .apply(null, args))
]).then(_ => resolve(), e), 0));
export const emitAll = (eventMap) => (eventArgs) => mapObject(eventMap, name => emit(eventMap)(name)
    .apply(null, eventArgs[name]));
//# sourceMappingURL=emit.js.map