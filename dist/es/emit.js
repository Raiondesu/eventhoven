import { metaEvents } from "./meta-events.js";
export const emit = (eventMap) => (event) => (...args) => Promise.all([
    emitMeta("EMIT")(eventMap, event, args),
    ...[...(eventMap[event] || [])].map(([handler, unsubscribe]) => handler
        && handler({ event, unsubscribe }, ...args))
]).then(_ => void 0);
export const emitMeta = (event) => (...args) => args[0] !== metaEvents
    ? emit(metaEvents)(event)(...args)
    : Promise.resolve();
//# sourceMappingURL=emit.js.map