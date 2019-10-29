import { subscribe } from "./subscribe.js";
export var wait = function (eventMap) {
    return function (event) { return new Promise(function (resolve) {
        return subscribe(eventMap)(event)((function (_) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_.unsubscribe(),
                resolve(args));
        }));
    }); };
};
export var harmonicWait = function (eventMap) {
    return function (event) {
        return function () { return wait(eventMap)(event); };
    };
};
//# sourceMappingURL=wait.js.map