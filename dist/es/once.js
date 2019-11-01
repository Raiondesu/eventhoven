export const once = (handler) => (_, ...args) => (handler(_, ...args), _.unsubscribe());
//# sourceMappingURL=once.js.map