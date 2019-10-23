import { __read, __spread } from "tslib";
import { eventMap } from './events.js';
import { emit } from './emit.js';
export var metaEvents = eventMap({
    subscribe: function (eventMap, eventName, handler) { },
    unsubscribe: function (eventMap, eventName, handler) { },
    emit: function (eventMap, eventName, args) { },
});
export var emitMeta = function (event) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new Promise(function (resolve) {
        if (args[0] === metaEvents) {
            return resolve();
        }
        resolve(emit(metaEvents)(event).apply(void 0, __spread(args)));
    });
}; };
//# sourceMappingURL=meta-events.js.map