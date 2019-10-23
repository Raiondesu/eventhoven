import { eventMap } from './events.js';
import { emit } from './emit.js';
import { mapObject } from './util.js';
export const metaEvents = eventMap({
    subscribe(eventMap, eventName, handler) { },
    unsubscribe(eventMap, eventName, handler) { },
    emit(eventMap, eventName, args) { },
});
const emitMeta = emit(metaEvents);
export const meta = mapObject(metaEvents, (eventName) => {
    const emitEvent = emitMeta(eventName);
    return (...args) => new Promise(_ => {
        if (args[0] === metaEvents) {
            return _();
        }
        return _(emitEvent(...args));
    });
});
//# sourceMappingURL=meta-events.js.map