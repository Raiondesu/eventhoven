import { meta } from './meta-events.js';
import { doForAll } from './util.js';
export const unsubscribe = (eventMap, m = meta) => (event) => (...handlers) => handlers.forEach(_ => (
// Emit meta-event (ignore promise)
m.unsubscribe(eventMap, event, _),
    eventMap[event]?.handlers.delete(_)));
export const off = unsubscribe;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=unsubscribe.js.map