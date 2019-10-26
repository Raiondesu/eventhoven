"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
/**
 * Creates an event collection based on handler templates
 *
 * @param events - an object with default handlers for events
 */
exports.eventMap = function (events) { return util_1.mapObject(events, function (key, obj) { return new Map([[obj[key], false]]); }); };
//# sourceMappingURL=events.js.map