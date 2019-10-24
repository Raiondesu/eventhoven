var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
/**
 * Maps object values by their keys into a new object
 *
 * Generaly equivalent to `Array.prototype.map()`
 */
export var mapObject = function (obj, value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = {}; }
    return Object.keys(obj).reduce(function (newObj, key) {
        newObj[key] = value(key, obj);
        return newObj;
    }, defaultValue);
};
/**
 * A `do`-er factory
 *
 * Applies a specified action for all events in a collection
 *
 * @param action - an action to apply
 */
export var doForAll = function (action) { return function (eventMap) {
    var mappedAction = action(eventMap);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        mapObject(eventMap, function (key) { return mappedAction(key).apply(void 0, __spread(args)); });
    };
}; };
//# sourceMappingURL=util.js.map