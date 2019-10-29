"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_events_1 = require("./meta-events");
const subscribe_1 = require("./subscribe");
const unsubscribe_1 = require("./unsubscribe");
const onMeta = subscribe_1.onAll(meta_events_1.metaEvents);
const offMeta = unsubscribe_1.offAll(meta_events_1.metaEvents);
const log = ({ event }, _map, eventName, argsOrHandler) => console.log(`${new Date().toISOString().match(/T(.*?)Z/)[1]} [EVENT ${event.toUpperCase()} "${String(eventName)}"] - ${Array.isArray(argsOrHandler)
    ? argsOrHandler.join(', ')
    : argsOrHandler}`);
exports.debug = ({ enable, log: logEvent }) => (enable ? onMeta : offMeta)(logEvent || log);
//# sourceMappingURL=debug.js.map