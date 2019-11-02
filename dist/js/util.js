"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObject = (obj, value) => [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].reduce((newObj, key) => (newObj[key] = value(key), newObj), {});
//# sourceMappingURL=util.js.map