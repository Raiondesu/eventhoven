import { eventMap } from "./events.js";
export const metaEvents = eventMap({
    subscribe(_, _eventMap, _eventName, _handler) { },
    unsubscribe(_, _eventMap, _eventName, _handler) { },
    emit(_, _eventMap, _eventName, _args) { },
});
//# sourceMappingURL=meta-events.js.map