import { meta } from './meta-events.js';
import { doForAll } from './util.js';
export const unsubscribe = (eventMap, m = meta) => (event) => (...handlers) => (handlers.length > 0 ? (handlers.forEach(h => {
    var _a;
    return (
    // Emit meta-event (ignore promise)
    m.unsubscribe(eventMap, event, h), (_a = eventMap[event]) === null || _a === void 0 ? void 0 : _a.handlers.delete(h));
})) : (eventMap[event].handlers.forEach((_, h) => (
// Emit meta-event (ignore promise)
m.unsubscribe(eventMap, event, h))),
    eventMap[event].handlers.clear()));
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map