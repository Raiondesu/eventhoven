import { subscribe } from "./subscribe.js";
import { once } from "./once.js";
export const wait = (eventMap) => (event) => new Promise(resolve => subscribe(eventMap)(event)(once(((_, ...args) => resolve(args)))));
export const harmonicWait = (eventMap) => (event) => () => wait(eventMap)(event);
//# sourceMappingURL=wait.js.map