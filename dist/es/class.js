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
        return off(this.map)(event)(...handlers);
    }
}
Eventhoven.emit = emit;
Eventhoven.on = on;
Eventhoven.off = off;
//# sourceMappingURL=class.js.map