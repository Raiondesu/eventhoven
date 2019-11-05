"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = (handler) => ((_, ...args) => (_.unsubscribe(), handler(_, ...args)));
//# sourceMappingURL=once.js.map