import { off } from "./unsubscribe.js";
import { emitMeta } from "./meta-events.js";
import { doForAll } from "./util.js";
export const subscribe = (eventMap) => (eventOrOpts, onceArg = false) => {
    const event = eventOrOpts.event || eventOrOpts;
    return (...handlers) => (handlers.forEach(handler => {
        emitMeta('subscribe')(eventMap, event, handler);
        eventMap[event].set(handler, eventOrOpts.once || onceArg);
    }),
        () => off(eventMap)(event)
            .apply(null, handlers));
};
export const on = subscribe;
export const subscribeToAll = doForAll(subscribe);
export const onAll = subscribeToAll;
//# sourceMappingURL=subscribe.js.map