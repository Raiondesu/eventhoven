import { emitMeta } from "./meta-events.js";
import { mapObject } from "./util.js";
export const emit = (eventMap) => (event) => (...args) => new Promise((resolve, e) => Promise.all([
    emitMeta('emit')(eventMap, event, args),
    ...[...eventMap[event]].map(([handler, unsubscribe]) => handler && handler
        .bind(null, { event, unsubscribe })(...args))
])
    .then(_ => resolve(), e));
export const emitAll = (eventMap) => (eventArgs) => mapObject(eventMap, name => emit(eventMap)(name)(...eventArgs[name]));
//# sourceMappingURL=emit.js.map