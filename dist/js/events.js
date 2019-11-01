"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.eventMap = (events) => util_1.mapObject(events, event => new Map().set(events[event], () => {
}));
//# sourceMappingURL=events.js.map