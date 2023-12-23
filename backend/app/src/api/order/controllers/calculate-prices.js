"use strict";
/**
 * calculate-order-prices service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::order.order', ({ strapi }) => ({
    async getOrderPrices(ctx) {
        const { body, session } = ctx;
        if (!(session === null || session === void 0 ? void 0 : session.uuid)) {
            return ctx.badRequest('No session uuid');
        }
        const cart = strapi.service('api::cart.cart').getCart(session.uuid);
        return 'test';
    },
}));
//# sourceMappingURL=calculate-prices.js.map