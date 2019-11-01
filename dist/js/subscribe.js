"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unsubscribe_1 = require("./unsubscribe");
const emit_1 = require("./emit");
const util_1 = require("./util");
exports.subscribe = (eventMap) => (event) => (...handlers) => {
    const unsub = (...handlers) => () => unsubscribe_1.unsubscribe(eventMap)(event)(...handlers);
    return event in eventMap ? unsub(...handlers.map(handler => (emit_1.emitMeta("SUBSCRIBE")(eventMap, event, handler),
        eventMap[event].set(handler, unsub(handler)),
        handler))) : () => { };
};
exports.on = exports.subscribe;
exports.subscribeToAll = util_1.doForAll(exports.subscribe);
exports.onAll = exports.subscribeToAll;
//# sourceMappingURL=subscribe.js.map