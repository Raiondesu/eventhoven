import { unsubscribe } from "./unsubscribe.js";
import { emitMeta } from "./emit.js";
import { doForAll } from "./util.js";
export const subscribe = (eventMap) => (event) => (...handlers) => ((unsub) => unsub(...handlers.map(handler => (emitMeta('subscribe')(eventMap, event, handler),
    eventMap[event].set(handler, unsub(handler)),
    handler))))((...handlers) => () => unsubscribe(eventMap)(event)(...handlers));
export const on = subscribe;
export const once = (handler) => (_, ...args) => (handler(_, ...args), _.unsubscribe());
export const subscribeToAll = doForAll(subscribe);
export const onAll = subscribeToAll;
//# sourceMappingURL=subscribe.js.map