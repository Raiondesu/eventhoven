import { eventMap } from "./events.js";
import { emit } from "./emit.js";
export const metaEvents = eventMap({
    subscribe(eventMap, eventName, handler) { },
    unsubscribe(eventMap, eventName, handler) { },
    emit(eventMap, eventName, args) { },
});
export const emitMeta = (event) => (...args) => Promise.resolve(args[0] !== metaEvents
    ? emit(metaEvents)(event).apply(null, args)
    : void 0);
//# sourceMappingURL=meta-events.js.map