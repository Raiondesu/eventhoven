export const mapObject = (obj, value) => Object.keys(obj).reduce((newObj, key) => (newObj[key] = value(key), newObj), {});
export const doForAll = (action) => (eventMap) => (...args) => {
    mapObject(eventMap, key => action(eventMap)(key).apply(null, args));
};
//# sourceMappingURL=util.js.map