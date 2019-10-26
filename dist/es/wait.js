import { on } from "./subscribe.js";
export const wait = (eventMap) => (event) => new Promise(resolve => on(eventMap)(event, true)(((...args) => resolve(args))));
export const harmonicWait = (eventMap) => (event) => () => wait(eventMap)(event);
//# sourceMappingURL=wait.js.map