import { metaEvents } from "./meta-events.js";
export const emit = (eventMap) => (event) => (...args) => emitMeta("EMIT")(eventMap, event, args).then(_ => Promise.all([...(eventMap[event] || [])].map(([handler, unsubscribe]) => handler
    && handler({ event, unsubscribe }, ...args))));
export const emitMeta = (event) => (...args) => args[0] !== metaEvents
    ? emit(metaEvents)(event)(...args)
    : Promise.resolve([]);
//# sourceMappingURL=emit.js.map