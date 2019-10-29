"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_events_1 = require("./meta-events");
const util_1 = require("./util");
exports.unsubscribe = (eventMap) => (event) => (...handlers) => {
    for (const h of handlers.length > 0
        ? handlers
        : eventMap[event].keys())
        meta_events_1.emitMeta('unsubscribe')(eventMap, event, h),
            eventMap[event].delete(h);
};
exports.off = exports.unsubscribe;
exports.unsubscribeFromAll = util_1.doForAll(exports.unsubscribe);
exports.offAll = exports.unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map