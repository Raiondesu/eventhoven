"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
const emit_1 = require("./emit");
const subscribe_1 = require("./subscribe");
const unsubscribe_1 = require("./unsubscribe");
class Eventhoven {
    constructor(events) {
        this.events = events;
        this.map = events_1.eventMap(events);
    }
    emit(event, ...args) {
        return emit_1.emit(this.map)(event)(...args);
    }
    on(event, ...handlers) {
        return subscribe_1.on(this.map)(event)(...handlers);
    }
    off(event, ...handlers) {
        return unsubscribe_1.off(this.map)(event)(...handlers);
    }
}
exports.Eventhoven = Eventhoven;
Eventhoven.emit = emit_1.emit;
Eventhoven.on = subscribe_1.on;
Eventhoven.off = unsubscribe_1.off;
//# sourceMappingURL=class.js.map