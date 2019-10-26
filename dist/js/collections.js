"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var emit_1 = require("./emit");
var subscribe_1 = require("./subscribe");
var unsubscribe_1 = require("./unsubscribe");
exports.createCollection = function (action) { return function (eventMap) { return util_1.mapObject(eventMap, action(eventMap)); }; };
exports.emitCollection = exports.createCollection(emit_1.emit);
exports.subscribeCollection = exports.createCollection(subscribe_1.on);
exports.unsubscribeCollection = exports.createCollection(unsubscribe_1.off);
exports.eventCollection = function (eventMap) { return ({
    emit: exports.emitCollection(eventMap),
    subscribe: exports.subscribeCollection(eventMap),
    unsubscribe: exports.unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map