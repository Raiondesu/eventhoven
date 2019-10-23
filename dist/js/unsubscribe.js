"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_js_1 = require("./meta-events.js");
var util_js_1 = require("./util.js");
exports.unsubscribe = function (eventMap, m) {
    if (m === void 0) { m = meta_events_js_1.meta; }
    return function (event) { return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return handlers.forEach(function (_) {
            var _a;
            return (
            // Emit meta-event (ignore promise)
            m.unsubscribe(eventMap, event, _), (_a = eventMap[event]) === null || _a === void 0 ? void 0 : _a.handlers.delete(_));
        });
    }; };
};
exports.off = exports.unsubscribe;
exports.unsubscribeFromAll = util_js_1.doForAll(exports.unsubscribe);
exports.offAll = exports.unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map