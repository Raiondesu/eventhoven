"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unsubscribe_1 = require("./unsubscribe");
const emit_1 = require("./emit");
exports.subscribe = (eventMap) => (event) => {
    const unsub = (...handlers) => () => unsubscribe_1.unsubscribe(eventMap)(event)(...handlers);
    return (...handlers) => unsub(...handlers.map(handler => (emit_1.emitMeta("SUBSCRIBE")(eventMap, event, handler),
        event in eventMap && eventMap[event].set(handler, unsub(handler)),
        handler)));
};
exports.on = exports.subscribe;
//# sourceMappingURL=subscribe.js.map