import { eventMap } from "./events.js";
import { emit } from "./emit.js";
export const metaEvents = eventMap({
    subscribe(_, eventMap, eventName, handler) { },
    unsubscribe(_, eventMap, eventName, handler) { },
    emit(_, eventMap, eventName, args) { },
});
export const emitMeta = (event) => (...args) => Promise.resolve(args[0] !== metaEvents
    ? emit(metaEvents)(event).apply(null, args)
    : void 0);
//# sourceMappingURL=meta-events.js.map