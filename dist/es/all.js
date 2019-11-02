import { mapObject } from "./util.js";
import { emit } from "./emit.js";
import { subscribe } from "./subscribe.js";
import { unsubscribe } from "./unsubscribe.js";
const doForAll = (action) => (eventMap) => (...args) => {
    mapObject(eventMap, key => action(eventMap)(key)(...args));
};
export const emitAll = (eventMap) => (eventArgs) => mapObject(eventMap, name => emit(eventMap)(name)(...eventArgs[name]));
export const subscribeToAll = doForAll(subscribe);
export const onAll = subscribeToAll;
export const unsubscribeFromAll = doForAll(unsubscribe);
export const offAll = unsubscribeFromAll;
//# sourceMappingURL=all.js.map