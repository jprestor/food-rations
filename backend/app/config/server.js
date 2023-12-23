"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    url: env("SERVER_URL"),
    host: env("HOST", "127.0.0.1"),
    port: env.int("PORT", 1337),
    proxy: true,
    app: {
        keys: env.array("APP_KEYS"),
    },
    webhooks: {
        populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
});
//# sourceMappingURL=server.js.map