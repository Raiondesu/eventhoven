"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_1 = require("./meta-events");
var subscribe_1 = require("./subscribe");
var unsubscribe_1 = require("./unsubscribe");
var onMeta = subscribe_1.onAll(meta_events_1.metaEvents);
var offMeta = unsubscribe_1.offAll(meta_events_1.metaEvents);
var log = function (_a, _map, eventName, argsOrHandler) {
    var event = _a.event;
    return console.log(new Date().toISOString().match(/T(.*?)Z/)[1] + " [EVENT " + event.toUpperCase() + " \"" + String(eventName) + "\"] - " + (Array.isArray(argsOrHandler)
        ? argsOrHandler.join(', ')
        : argsOrHandler));
};
exports.debug = function (_a) {
    var enable = _a.enable, logEvent = _a.log;
    return (enable ? onMeta : offMeta)(logEvent || log);
};
//# sourceMappingURL=debug.js.map