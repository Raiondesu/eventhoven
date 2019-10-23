/**
 * Maps object values by their keys into a new object
 *
 * Generaly equivalent to `Array.prototype.map()`
 */
export const mapObject = (obj, value, defaultValue = {}) => Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = value(key, obj);
    return newObj;
}, defaultValue);
/**
 * A `do`-er factory
 *
 * Applies a specified action for all events in a collection
 *
 * @param action - an action to apply
 */
export const doForAll = (action) => (eventMap) => {
    const mappedAction = action(eventMap);
    return (...args) => {
        mapObject(eventMap, (key) => mappedAction(key)(...args));
    };
};
//# sourceMappingURL=util.js.map