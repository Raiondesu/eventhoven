import { mapObject } from "./util.js";
export const eventMap = (events) => mapObject(events, (key, obj) => new Map([[obj[key], false]]));
//# sourceMappingURL=events.js.map