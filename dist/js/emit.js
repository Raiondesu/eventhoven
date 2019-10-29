"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_events_1 = require("./meta-events");
const util_1 = require("./util");
exports.emit = (eventMap) => (event) => (...args) => new Promise((resolve, e) => Promise.all([
    meta_events_1.emitMeta('emit')(eventMap, event, args),
    ...[...eventMap[event]].map(([handler, unsubscribe]) => handler
        && handler({ event, unsubscribe }, ...args))
]).then(_ => resolve(), e));
exports.emitAll = (eventMap) => (eventArgs) => util_1.mapObject(eventMap, name => exports.emit(eventMap)(name)(...eventArgs[name]));
//# sourceMappingURL=emit.js.map