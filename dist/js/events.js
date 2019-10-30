"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.eventMap = (events) => util_1.mapObject(events, key => new Map([[events[key], () => {
        }]]));
//# sourceMappingURL=events.js.map