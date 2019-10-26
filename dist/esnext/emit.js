import { emitMeta } from "./meta-events.js";
import { mapObject } from "./util.js";
export const emit = (eventMap) => (event) => (...args) => {
    const handlers = eventMap[event];
    const results = [
        emitMeta('emit')(eventMap, event, args)
    ];
    return new Promise(resolve => setTimeout(() => (handlers.forEach((once, handler) => (results.push(handler && handler
        .bind(null, { event, once })
        .apply(null, args)),
        (once && handlers.delete(handler)))),
        resolve(Promise.all(results).then(_ => void 0))), 0));
};
export const emitAll = (eventMap) => (eventArgs) => mapObject(eventMap, (name) => emit(eventMap)(name)
    .apply(null, eventArgs[name]));
//# sourceMappingURL=emit.js.map