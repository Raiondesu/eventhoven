"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscribe_1 = require("./subscribe");
const once_1 = require("./once");
exports.wait = (eventMap) => (event) => new Promise(resolve => subscribe_1.subscribe(eventMap)(event)(once_1.once(((_, ...args) => resolve(args)))));
exports.harmonicWait = (eventMap) => (event) => () => exports.wait(eventMap)(event);
//# sourceMappingURL=wait.js.map