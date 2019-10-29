"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
exports.metaEvents = events_1.eventMap({
    subscribe(_, _eventMap, _eventName, _handler) { },
    unsubscribe(_, _eventMap, _eventName, _handler) { },
    emit(_, _eventMap, _eventName, _args) { },
});
//# sourceMappingURL=meta-events.js.map