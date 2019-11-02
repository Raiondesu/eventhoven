"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_events_1 = require("./meta-events");
const all_1 = require("./all");
const onMeta = all_1.onAll(meta_events_1.metaEvents);
const offMeta = all_1.offAll(meta_events_1.metaEvents);
const log = ({ event }, map, eventName, argsOrHandler) => console.log(new Date().toJSON().substr(14, 9), `[${event} "${String(eventName)}"${eventName in map ? '' : ' (INVALID)'}] -`, ...(Array.isArray(argsOrHandler)
    ? argsOrHandler
    : [argsOrHandler]));
exports.debug = ({ enable, log: logEvent = log }) => (enable ? onMeta : offMeta)(logEvent);
//# sourceMappingURL=debug.js.map