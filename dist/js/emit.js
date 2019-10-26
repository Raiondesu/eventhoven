"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meta_events_1 = require("./meta-events");
var util_1 = require("./util");
exports.emit = function (eventMap) {
    return function (event) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var handlers = eventMap[event];
            var results = [
                meta_events_1.emitMeta('emit')(eventMap, event, args)
            ];
            return new Promise(function (resolve) { return setTimeout(function () { return (handlers.forEach(function (once, handler) { return (results.push(handler && handler
                .bind(null, { event: event, once: once })
                .apply(null, args)),
                (once && handlers.delete(handler))); }),
                resolve(Promise.all(results).then(function (_) { return void 0; }))); }, 0); });
        };
    };
};
exports.emitAll = function (eventMap) { return function (eventArgs) { return util_1.mapObject(eventMap, function (name) { return exports.emit(eventMap)(name)
    .apply(null, eventArgs[name]); }); }; };
//# sourceMappingURL=emit.js.map