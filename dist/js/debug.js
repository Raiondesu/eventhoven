import { metaEvents } from "./meta-events.js";
import { onAll } from "./subscribe.js";
import { offAll } from "./unsubscribe.js";
var onMeta = onAll(metaEvents);
var offMeta = offAll(metaEvents);
var log = function (_a, _map, eventName, argsOrHandler) {
    var event = _a.event;
    return console.log(new Date().toISOString().match(/T(.*?)Z/)[1] + " [EVENT " + event.toUpperCase() + " \"" + String(eventName) + "\"] - " + (Array.isArray(argsOrHandler)
        ? argsOrHandler.join(', ')
        : argsOrHandler));
};
export var debug = function (_a) {
    var enable = _a.enable, logEvent = _a.log;
    return (enable ? onMeta : offMeta)(logEvent || log);
};
//# sourceMappingURL=debug.js.map