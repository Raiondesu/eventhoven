import { eventCollection } from "./collections.js";
import { eventMap } from "./events.js";
import { emit } from "./emit.js";
import { on } from "./subscribe.js";
import { off } from "./unsubscribe.js";
export class Eventhoven {
    constructor(events) {
        this.events = events;
        this.map = eventMap(events);
        const collection = eventCollection(this.map);
        this.emit = collection.emit;
        this.on = collection.subscribe;
        this.off = collection.unsubscribe;
    }
}
Eventhoven.emit = emit;
Eventhoven.on = on;
Eventhoven.off = off;
//# sourceMappingURL=class.js.map