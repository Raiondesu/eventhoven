"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emit_1 = require("./emit");
exports.unsubscribe = (eventMap) => (event) => (...handlers) => {
    if (event in eventMap)
        for (const h of handlers.length > 0
            ? handlers
            : eventMap[event].keys())
            emit_1.emitMeta("UNSUBSCRIBE")(eventMap, event, h),
                eventMap[event].delete(h);
};
exports.off = exports.unsubscribe;
//# sourceMappingURL=unsubscribe.js.map