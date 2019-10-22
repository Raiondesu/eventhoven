import { eventMap } from './events';
import { emit } from './emit';
import { mapObject } from './util';
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