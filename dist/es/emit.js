import { metaEvents } from "./meta-events.js";
import { mapObject } from "./util.js";
export const emit = (eventMap) => (event) => (...args) => new Promise((resolve, e) => Promise.all([
    emitMeta("EMIT")(eventMap, event, args),
    ...[...(eventMap[event] || [])].map(([handler, unsubscribe]) => handler
        && handler({ event, unsubscribe }, ...args))
]).then(_ => resolve(), e));
export const emitAll = (eventMap) => (eventArgs) => mapObject(eventMap, name => emit(eventMap)(name)(...eventArgs[name]));
export const emitMeta = (event) => (...args) => args[0] !== metaEvents
    ? emit(metaEvents)(event)(...args)
    : Promise.resolve();
//# sourceMappingURL=emit.js.map