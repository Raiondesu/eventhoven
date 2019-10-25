import { eventMap } from './events.js';
import { emit } from './emit.js';
export const metaEvents = eventMap({
    subscribe(eventMap, eventName, handler) { },
    unsubscribe(eventMap, eventName, handler) { },
    emit(eventMap, eventName, args) { },
});
export const emitMeta = (event) => (...args) => new Promise(resolve => {
    if (args[0] !== metaEvents) {
        resolve(emit(metaEvents)(event).apply(null, args));
    }
});
//# sourceMappingURL=meta-events.js.map