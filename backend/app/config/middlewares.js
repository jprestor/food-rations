"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => [
    "strapi::errors",
    "strapi::security",
    {
        name: "strapi::cors",
        config: {
            origin: env.array("CORS_ORIGIN"),
        },
    },
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    'global::transform-dynamic-zone',
];
//# sourceMappingURL=middlewares.js.map