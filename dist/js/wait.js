"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscribe_1 = require("./subscribe");
exports.wait = (eventMap) => (event) => new Promise(resolve => subscribe_1.subscribe(eventMap)(event)(((_, ...args) => (_.unsubscribe(),
    resolve(args)))));
exports.harmonicWait = (eventMap) => (event) => () => exports.wait(eventMap)(event);
//# sourceMappingURL=wait.js.map