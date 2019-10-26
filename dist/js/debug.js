"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_1 = require("./meta-events");
var collections_1 = require("./collections");
var util_1 = require("./util");
var metaSub = collections_1.subscribeCollection(meta_events_1.metaEvents);
var metaUnsub = collections_1.unsubscribeCollection(meta_events_1.metaEvents);
var log = function (type) { return function (_map, event, argsOrHandler) { return console.log(new Date().toLocaleTimeString() + " [EVENT " + type.toUpperCase() + " \"" + String(event) + "\"]: " + (Array.isArray(argsOrHandler)
    ? argsOrHandler.join(', ')
    : argsOrHandler)); }; };
/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
exports.debug = function (enable, logEvent) {
    if (logEvent === void 0) { logEvent = log; }
    util_1.mapObject(meta_events_1.metaEvents, function (name) { return (enable ? metaSub : metaUnsub)[name](logEvent(name)); });
};
//# sourceMappingURL=debug.js.map