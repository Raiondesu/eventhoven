"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
const emit_1 = require("./emit");
exports.metaEvents = events_1.eventMap({
    subscribe(_, _eventMap, _eventName, _handler) { },
    unsubscribe(_, _eventMap, _eventName, _handler) { },
    emit(_, _eventMap, _eventName, _args) { },
});
exports.emitMeta = (event) => (...args) => args[0] !== exports.metaEvents
    ? emit_1.emit(exports.metaEvents)(event)(...args)
    : Promise.resolve();
//# sourceMappingURL=meta-events.js.map