"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    url: env("ADMIN_URL"),
    auth: {
        secret: env("ADMIN_JWT_SECRET"),
    },
    apiToken: {
        salt: env("API_TOKEN_SALT"),
    },
    transfer: {
        token: {
            salt: env("TRANSFER_TOKEN_SALT"),
        },
    },
});
//# sourceMappingURL=admin.js.map