import { mapObject } from "./util.js";
export const eventMap = (events) => mapObject(events, event => new Map().set(events[event], () => {
}));
//# sourceMappingURL=events.js.map