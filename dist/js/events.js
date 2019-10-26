"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
exports.eventMap = function (events) { return util_1.mapObject(events, function (key, obj) { return new Map([[obj[key], false]]); }); };
//# sourceMappingURL=events.js.map