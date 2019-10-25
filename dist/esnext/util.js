/**
 * Maps object values by their keys into a new object
 *
 * Generaly equivalent to `Array.prototype.map()`
 */
export const mapObject = (obj, value, defaultValue = {}) => Object.keys(obj).reduce((newObj, key) => ((newObj[key] = value(key, obj)),
    newObj), defaultValue);
/**
 * A `do`-er factory
 *
 * Applies a specified action for all events in a collection
 *
 * @param action - an action to apply
 */
export const doForAll = (action) => (eventMap) => (...args) => {
    mapObject(eventMap, (key) => action(eventMap)(key).apply(null, args));
};
//# sourceMappingURL=util.js.map