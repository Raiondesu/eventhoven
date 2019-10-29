import { mapObject } from "./util.js";
export var eventMap = function (events) { return mapObject(events, function (key) { return new Map([[events[key], function () {
        }]]); }); };
//# sourceMappingURL=events.js.map