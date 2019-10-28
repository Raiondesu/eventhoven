"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
exports.eventMap = function (events) { return util_1.mapObject(events, function (key) { return [[events[key], function () {
        }]]; }); };
//# sourceMappingURL=events.js.map