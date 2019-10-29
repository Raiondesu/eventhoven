"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObject = (obj, value) => Object.keys(obj).reduce((newObj, key) => (newObj[key] = value(key), newObj), {});
exports.doForAll = (action) => (eventMap) => (...args) => {
    exports.mapObject(eventMap, key => action(eventMap)(key)(...args));
};
//# sourceMappingURL=util.js.map