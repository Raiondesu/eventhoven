export const mapObject = (obj, value) => [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].reduce((newObj, key) => (newObj[key] = value(key), newObj), {});
export const doForAll = (action) => (eventMap) => (...args) => {
    mapObject(eventMap, key => action(eventMap)(key)(...args));
};
//# sourceMappingURL=util.js.map