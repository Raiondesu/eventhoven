export const once = (handler) => ((_, ...args) => (_.unsubscribe(), handler(_, ...args)));
//# sourceMappingURL=once.js.map