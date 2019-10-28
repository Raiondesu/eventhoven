"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var emit_1 = require("./emit");
var subscribe_1 = require("./subscribe");
var unsubscribe_1 = require("./unsubscribe");
var createCollection = function (action) { return function (eventMap) { return util_1.mapObject(eventMap, action(eventMap)); }; };
exports.emitCollection = createCollection(emit_1.emit);
exports.subscribeCollection = createCollection(subscribe_1.subscribe);
exports.unsubscribeCollection = createCollection(unsubscribe_1.unsubscribe);
exports.eventCollection = function (eventMap) { return ({
    emit: exports.emitCollection(eventMap),
    subscribe: exports.subscribeCollection(eventMap),
    unsubscribe: exports.unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map