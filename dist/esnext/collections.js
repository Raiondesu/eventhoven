import { mapObject } from "./util.js";
import { emit } from "./emit.js";
import { on } from "./subscribe.js";
import { off } from "./unsubscribe.js";
export const createCollection = (action) => (eventMap) => mapObject(eventMap, action(eventMap));
export const emitCollection = createCollection(emit);
export const subscribeCollection = createCollection(on);
export const unsubscribeCollection = createCollection(off);
export const eventCollection = (eventMap) => ({
    emit: emitCollection(eventMap),
    subscribe: subscribeCollection(eventMap),
    unsubscribe: unsubscribeCollection(eventMap),
});
//# sourceMappingURL=collections.js.map