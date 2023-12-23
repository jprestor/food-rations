"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { v4: uuidv4 } = require('uuid');
exports.default = (config, { strapi }) => {
    return async (ctx, next) => {
        const { session } = ctx;
        if (!(session === null || session === void 0 ? void 0 : session.uuid)) {
            session.uuid = uuidv4();
        }
        await next();
    };
};
//# sourceMappingURL=session-uuid.js.map