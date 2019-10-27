import { emitMeta } from "./meta-events.js";
import { mapObject } from "./util.js";
export const emit = (eventMap) => (event) => (...args) => {
    const results = [
        emitMeta('emit')(eventMap, event, args)
    ];
    return new Promise((resolve, e) => setTimeout(() => (eventMap[event].forEach((once, handler) => (results.push(handler && handler
        .bind(null, { event, once })
        .apply(null, args)),
        (once && eventMap[event].delete(handler)))),
        Promise.all(results)
            .then(_ => resolve())
            .catch(e)), 0));
};
export const emitAll = (eventMap) => (eventArgs) => mapObject(eventMap, (name) => emit(eventMap)(name)
    .apply(null, eventArgs[name]));
//# sourceMappingURL=emit.js.map