import { eventMap } from "./events.js";
import { emit } from "./emit.js";
export const metaEvents = eventMap({
    subscribe(_, _eventMap, _eventName, _handler) { },
    unsubscribe(_, _eventMap, _eventName, _handler) { },
    emit(_, _eventMap, _eventName, _args) { },
});
export const emitMeta = (event) => (...args) => args[0] !== metaEvents
    ? emit(metaEvents)(event)(...args)
    : Promise.resolve();
//# sourceMappingURL=meta-events.js.map