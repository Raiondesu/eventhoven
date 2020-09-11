import { eventMap } from "./events.js";
import { emit } from "./emit.js";
import { on } from "./subscribe.js";
import { off } from "./unsubscribe.js";
export class Eventhoven {
    constructor(events) {
        this.events = events;
        this.map = eventMap(events);
    }
    emit(event, ...args) {
        return emit(this.map)(event)(...args);
    }
    on(event, ...handlers) {
        return on(this.map)(event)(...handlers);
    }
    off(event, ...handlers) {
        off(this.map)(event)(...handlers);
        return this;
    }
    static emit(eventMap, event, ...args) {
        return emit(eventMap instanceof Eventhoven
            ? eventMap.map
            : eventMap)(event)(...args);
    }
    static on(eventMap, event, ...handlers) {
        return on(eventMap instanceof Eventhoven
            ? eventMap.map
            : eventMap)(event)(...handlers);
    }
    static off(eventMap, event, ...handlers) {
        return off(eventMap instanceof Eventhoven
            ? eventMap.map
            : eventMap)(event)(...handlers);
    }
}
//# sourceMappingURL=class.js.map