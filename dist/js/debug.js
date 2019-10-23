"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscribe_1 = require("./subscribe");
var unsubscribe_1 = require("./unsubscribe");
var meta_events_1 = require("./meta-events");
var onMeta = subscribe_1.onAll(meta_events_1.metaEvents);
var offMeta = unsubscribe_1.offAll(meta_events_1.metaEvents);
var log = function (map, event, argsOrHandler) { return console.log(new Date().toTimeString() + " [EVENT \"" + String(event) + "\"]: " + argsOrHandler + " from " + map); };
/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param {boolean} enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
exports.debug = function (enable) { return (enable ? onMeta : offMeta)(log); };
//# sourceMappingURL=debug.js.map