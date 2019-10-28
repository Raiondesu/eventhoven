import { unsubscribe } from "./unsubscribe.js";
import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export const subscribe = (eventMap) => (event) => (...handlers) => {
    const unsub = () => unsubscribe(eventMap)(event)
        .apply(null, handlers);
    handlers.forEach(handler => {
        emitMeta('subscribe')(eventMap, event, handler);
        eventMap[event].push([handler, unsub]);
    });
    return unsub;
};
export const on = subscribe;
export const once = (handler) => (_, ...args) => (handler(_, ...args), _.unsubscribe());
export const subscribeToAll = doForAll(subscribe);
export const onAll = subscribeToAll;
//# sourceMappingURL=subscribe.js.map