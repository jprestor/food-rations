"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::cart.cart', ({ strapi }) => ({
    getCart: async (ctx) => {
        const { session } = ctx;
        if (!(session === null || session === void 0 ? void 0 : session.uuid)) {
            return ctx.badRequest('No session uuid');
        }
        return await strapi.service('api::cart.cart').getCart(session.uuid);
    },
    addToCart: async ({ request, session }) => {
        const { id, count } = request.body;
        return await strapi.service('api::cart.cart').addToCart({
            uuid: session.uuid,
            productId: id,
            count,
        });
    },
    addToCartMultiple: async ({ request, session }) => {
        return await strapi.service('api::cart.cart').addToCartMultiple({
            uuid: session.uuid,
            items: request.body.items,
        });
    },
    removeFromCart: async (ctx) => {
        const { request, session } = ctx;
        const { id } = request.body;
        if (!id && !session.uuid) {
            return ctx.badRequest('No product id, or session uuid');
        }
        const cart = await strapi.service('api::cart.cart').removeFromCart({
            uuid: session.uuid,
            productId: id,
        });
        return cart;
    },
    restoreFromDeleted: async (ctx) => {
        const { request, session } = ctx;
        const { id } = request.body;
        if (!id && !session.uuid) {
            return ctx.badRequest('No product id, or session uuid');
        }
        const cart = await strapi.service('api::cart.cart').restoreFromDeleted({
            uuid: session.uuid,
            productId: id,
        });
        return cart;
    },
    setEmptyCart: async ({ request, session }) => {
        const cart = await strapi.service('api::cart.cart').setEmptyCart({
            uuid: session.uuid,
        });
        return cart;
    },
}));
//# sourceMappingURL=cart.js.map