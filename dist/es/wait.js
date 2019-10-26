import { subscribe } from "./subscribe.js";
export const wait = (eventMap) => (event) => new Promise(resolve => subscribe(eventMap)(event, true)(((...args) => resolve(args))));
export const harmonicWait = (eventMap) => (event) => () => wait(eventMap)(event);
//# sourceMappingURL=wait.js.map