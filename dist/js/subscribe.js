"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unsubscribe_1 = require("./unsubscribe");
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
exports.subscribe = function (eventMap) { return function (eventOrOpts, onceArg) {
    if (onceArg === void 0) { onceArg = false; }
    var event = eventOrOpts.event || eventOrOpts;
    return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return (handlers.forEach(function (handler) {
            meta_events_1.emitMeta('subscribe')(eventMap, event, handler);
            eventMap[event].set(handler, eventOrOpts.once || onceArg);
        }),
            function () { return unsubscribe_1.unsubscribe(eventMap)(event)
                .apply(null, handlers); });
    };
}; };
exports.on = exports.subscribe;
exports.subscribeToAll = util_1.doForAll(exports.subscribe);
exports.onAll = exports.subscribeToAll;
//# sourceMappingURL=subscribe.js.map