"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const emit_1 = require("./emit");
const subscribe_1 = require("./subscribe");
const unsubscribe_1 = require("./unsubscribe");
const doForAll = (action) => (eventMap) => (...args) => {
    util_1.mapObject(eventMap, key => action(eventMap)(key)(...args));
};
exports.emitAll = (eventMap) => (eventArgs) => util_1.mapObject(eventMap, name => emit_1.emit(eventMap)(name)(...eventArgs[name]));
exports.subscribeToAll = doForAll(subscribe_1.subscribe);
exports.onAll = exports.subscribeToAll;
exports.unsubscribeFromAll = doForAll(unsubscribe_1.unsubscribe);
exports.offAll = exports.unsubscribeFromAll;
//# sourceMappingURL=all.js.map