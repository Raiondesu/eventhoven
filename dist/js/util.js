"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Maps object values by their keys into a new object
 *
 * Generaly equivalent to `Array.prototype.map()`
 */
exports.mapObject = function (obj, value, defaultValue) {
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
exports.doForAll = function (action) { return function (eventMap) {
    var mappedAction = action(eventMap);
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        exports.mapObject(eventMap, function (key) { return mappedAction(key).apply(null, args); });
    };
}; };
//# sourceMappingURL=util.js.map