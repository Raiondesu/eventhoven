import { meta } from './meta-events';
import { doForAll } from './util';
export const unsubscribe = (eventMap) => (event) => (...handlers) => handlers.forEach(_ => {
    var _a;
    return (
    // Emit meta-event
    meta.unsubscribe(eventMap, event, _), (_a = eventMap[event]) === null || _a === void 0 ? void 0 : _a.handlers.delete(_));
});
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map