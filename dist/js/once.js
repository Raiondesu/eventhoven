"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = (handler) => (_, ...args) => (handler(_, ...args), _.unsubscribe());
//# sourceMappingURL=once.js.map