"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_events_1 = require("./meta-events");
const all_1 = require("./all");
const onMeta = all_1.onAll(meta_events_1.metaEvents);
const offMeta = all_1.offAll(meta_events_1.metaEvents);
const log = ({ event }, map, eventName, argsOrHandler) => console.log(new Date().toJSON().substr(14, 9), `[${event} "${String(eventName)}"${eventName in map ? '' : ' (INVALID)'}] -`, argsOrHandler);
exports.customDebug = (logEvent) => (enable) => (enable ? onMeta : offMeta)(logEvent);
exports.debug = exports.customDebug(log);
//# sourceMappingURL=debug.js.map