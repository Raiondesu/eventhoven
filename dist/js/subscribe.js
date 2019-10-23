"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unsubscribe_js_1 = require("./unsubscribe.js");
var meta_events_js_1 = require("./meta-events.js");
var util_js_1 = require("./util.js");
/**
 * A subscriber factory
 *
 * @param eventMap - an event collection to subscribe to
 * @param [unsubscribe] - (optional) a custom unsubscribe handler
 * @param [meta] - (optional) a custom meta events handler collection
 * @returns a function that subscribes handlers to a given event in a collection
 */
function subscribe(eventMap, _a) {
    var _b = _a === void 0 ? {
        unsubscribe: unsubscribe_js_1.unsubscribe,
        meta: meta_events_js_1.meta
    } : _a, m = _b.meta, unsub = _b.unsubscribe;
    var subscribeHandlers = function (event, once) { return function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        if (!eventMap[event]) {
            // Soft handle type mismatch
            eventMap[event] = {
                arity: 0,
                handlers: new Map(),
            };
        }
        handlers.forEach(function (handler) {
            if (typeof handler !== 'function') {
                return;
            }
            // Emit meta-event (ignore promise)
            m.subscribe(eventMap, event, handler);
            eventMap[event].handlers.set(handler, once);
        });
        return function () { return unsub(eventMap)(event)
            .apply(null, handlers); };
    }; };
    function subscribeTo(eventOrOpts, onceArg) {
        if (onceArg === void 0) { onceArg = true; }
        var event = typeof eventOrOpts === 'object' ? eventOrOpts.event : eventOrOpts;
        var once = typeof eventOrOpts === 'object' ? !!eventOrOpts.once : onceArg;
        return subscribeHandlers(event, once);
    }
    return subscribeTo;
}
exports.subscribe = subscribe;
exports.on = subscribe;
/**
 * A subscriber factory for all events of a given collection
 *
 * @param eventMap - an event collection to subscribe to
 * @returns a function that subscribes handlers to all events in the given event collection
 */
exports.subscribeToAll = util_js_1.doForAll(subscribe);
exports.onAll = exports.subscribeToAll;
//# sourceMappingURL=subscribe.js.map