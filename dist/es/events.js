import { mapObject } from "./util.js";
export const eventMap = (events) => mapObject(events, key => new Map([[events[key], () => {
        }]]));
//# sourceMappingURL=events.js.map