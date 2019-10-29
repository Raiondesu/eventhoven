import { mapObject } from "./util.js";
import { emit } from "./emit.js";
import { subscribe } from "./subscribe.js";
import { unsubscribe } from "./unsubscribe.js";
var createCollection = function (action) { return function (eventMap) { return mapObject(eventMap, action(eventMap)); }; };
export var emitCollection = createCollection(emit);
export var subscribeCollection = createCollection(subscribe);
export var unsubscribeCollection = createCollection(unsubscribe);
export var eventCollection = function (eventMap) { return ({
    emit: emitCollection(eventMap),
    subscribe: subscribeCollection(eventMap),
    unsubscribe: unsubscribeCollection(eventMap),
}); };
//# sourceMappingURL=collections.js.map