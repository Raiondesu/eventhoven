import { mapObject } from "./util.js";
import { emit } from "./emit.js";
import { subscribe } from "./subscribe.js";
import { unsubscribe } from "./unsubscribe.js";
const createCollection = (action) => (eventMap) => mapObject(eventMap, action(eventMap));
export const emitCollection = createCollection(emit);
export const subscribeCollection = createCollection(subscribe);
export const unsubscribeCollection = createCollection(unsubscribe);
export const eventCollection = (eventMap) => ({
    emit: emitCollection(eventMap),
    subscribe: subscribeCollection(eventMap),
    unsubscribe: unsubscribeCollection(eventMap),
});
//# sourceMappingURL=collections.js.map