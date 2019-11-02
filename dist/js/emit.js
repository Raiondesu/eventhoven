"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_events_1 = require("./meta-events");
exports.emit = (eventMap) => (event) => (...args) => new Promise((resolve, e) => Promise.all([
    exports.emitMeta("EMIT")(eventMap, event, args),
    ...[...(eventMap[event] || [])].map(([handler, unsubscribe]) => handler
        && handler({ event, unsubscribe }, ...args))
]).then(_ => resolve(), e));
exports.emitMeta = (event) => (...args) => args[0] !== meta_events_1.metaEvents
    ? exports.emit(meta_events_1.metaEvents)(event)(...args)
    : Promise.resolve();
//# sourceMappingURL=emit.js.map