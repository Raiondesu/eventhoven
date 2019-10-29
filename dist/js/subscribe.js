"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unsubscribe_1 = require("./unsubscribe");
const emit_1 = require("./emit");
const util_1 = require("./util");
exports.subscribe = (eventMap) => (event) => (...handlers) => {
    const unsub = (_handlers) => () => unsubscribe_1.unsubscribe(eventMap)(event)(..._handlers);
    handlers.forEach(handler => {
        emit_1.emitMeta('subscribe')(eventMap, event, handler);
        eventMap[event].set(handler, unsub([handler]));
    });
    return unsub(handlers);
};
exports.on = exports.subscribe;
exports.once = (handler) => (_, ...args) => (handler(_, ...args), _.unsubscribe());
exports.subscribeToAll = util_1.doForAll(exports.subscribe);
exports.onAll = exports.subscribeToAll;
//# sourceMappingURL=subscribe.js.map