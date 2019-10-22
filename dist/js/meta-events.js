import { __read, __spread } from "tslib";
import { eventMap } from './events';
import { emit } from './emit';
import { mapObject } from './util';
export var metaEvents = eventMap({
    subscribe: function (eventMap, eventName, handler) { },
    unsubscribe: function (eventMap, eventName, handler) { },
    emit: function (eventMap, eventName, args) { },
});
var emitMeta = emit(metaEvents);
export var meta = mapObject(metaEvents, function (eventName) {
    var emitEvent = emitMeta(eventName);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (_) {
            if (args[0] === metaEvents) {
                return _();
            }
            return _(emitEvent.apply(void 0, __spread(args)));
        });
    };
});
//# sourceMappingURL=meta-events.js.map