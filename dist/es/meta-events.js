import { eventMap } from "./events.js";
export const metaEvents = eventMap({
    ["EMIT"](_, _map, _event, _args) { },
    ["SUBSCRIBE"](_, _map, _event, _handler) { },
    ["UNSUBSCRIBE"](_, _map, _event, _handler) { },
});
//# sourceMappingURL=meta-events.js.map