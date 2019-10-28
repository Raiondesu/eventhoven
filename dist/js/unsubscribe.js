"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
exports.unsubscribe = function (eventMap) { return function (event) { return function () {
    var handlers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handlers[_i] = arguments[_i];
    }
    return handlers.length > 0
        ? handlers.forEach(function (_) { return (meta_events_1.emitMeta('unsubscribe')(eventMap, event, _),
            eventMap[event].splice(eventMap[event].findIndex(function (h) { return h[0] == _; }), 1)); })
        : eventMap[event].splice(0).forEach(function (h) { return meta_events_1.emitMeta('unsubscribe')(eventMap, event, h[0]); });
}; }; };
exports.off = exports.unsubscribe;
exports.unsubscribeFromAll = util_1.doForAll(exports.unsubscribe);
exports.offAll = exports.unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map