"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObject = function (obj, value) { return Object.keys(obj).reduce(function (newObj, key) { return ((newObj[key] = value(key, obj)),
    newObj); }, {}); };
exports.doForAll = function (action) { return function (eventMap) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    exports.mapObject(eventMap, function (key) { return action(eventMap)(key).apply(null, args); });
}; }; };
//# sourceMappingURL=util.js.map