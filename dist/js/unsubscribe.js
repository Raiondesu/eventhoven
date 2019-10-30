"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emit_1 = require("./emit");
const util_1 = require("./util");
exports.unsubscribe = (eventMap) => (event) => (...handlers) => {
    for (const h of handlers.length > 0
        ? handlers
        : eventMap[event].keys())
        emit_1.emitMeta("UNSUBSCRIBE")(eventMap, event, h),
            eventMap[event].delete(h);
};
exports.off = exports.unsubscribe;
exports.unsubscribeFromAll = util_1.doForAll(exports.unsubscribe);
exports.offAll = exports.unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map