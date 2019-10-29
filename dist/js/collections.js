"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const emit_1 = require("./emit");
const subscribe_1 = require("./subscribe");
const unsubscribe_1 = require("./unsubscribe");
const createCollection = (action) => (eventMap) => util_1.mapObject(eventMap, action(eventMap));
exports.emitCollection = createCollection(emit_1.emit);
exports.subscribeCollection = createCollection(subscribe_1.subscribe);
exports.unsubscribeCollection = createCollection(unsubscribe_1.unsubscribe);
exports.eventCollection = (eventMap) => ({
    emit: exports.emitCollection(eventMap),
    subscribe: exports.subscribeCollection(eventMap),
    unsubscribe: exports.unsubscribeCollection(eventMap),
});
//# sourceMappingURL=collections.js.map