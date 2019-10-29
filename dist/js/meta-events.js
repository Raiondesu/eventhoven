"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
exports.metaEvents = events_1.eventMap({
    ["EMIT"](_, _map, _event, _args) { },
    ["SUBSCRIBE"](_, _map, _event, _handler) { },
    ["UNSUBSCRIBE"](_, _map, _event, _handler) { },
});
//# sourceMappingURL=meta-events.js.map