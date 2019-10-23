"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_js_1 = require("./util.js");
/**
 * Creates an event collection based on handler templates
 *
 * @param events - an object with default handlers for events
 */
exports.eventMap = function (events) { return util_js_1.mapObject(events, function (key, obj) { return ({
    arity: obj[key].length,
    handlers: new Map([[obj[key], false]]),
}); }); };
//# sourceMappingURL=events.js.map