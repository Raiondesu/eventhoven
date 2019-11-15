"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("./collections");
const events_1 = require("./events");
const emit_1 = require("./emit");
const subscribe_1 = require("./subscribe");
const unsubscribe_1 = require("./unsubscribe");
class Eventhoven {
    constructor(events) {
        this.events = events;
        this.map = events_1.eventMap(events);
        const collection = collections_1.eventCollection(this.map);
        this.emit = collection.emit;
        this.on = collection.subscribe;
        this.off = collection.unsubscribe;
    }
}
exports.Eventhoven = Eventhoven;
Eventhoven.emit = emit_1.emit;
Eventhoven.on = subscribe_1.on;
Eventhoven.off = unsubscribe_1.off;
//# sourceMappingURL=class.js.map