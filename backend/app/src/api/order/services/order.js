"use strict";
/**
 * order service
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService('api::order.order', ({ strapi }) => ({
    async getPrices(productsPrice, promocodeID) {
        var _a, _b;
        const { refs } = (await strapi.entityService.findMany('api::misc.misc', {
            populate: ['refs.fields'],
        }));
        const deliveryPriceRef = refs.find((i) => i.slug === 'deliveryPrice');
        const deliveryPriceSum = (_b = (_a = deliveryPriceRef.fields) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
        const deliveryPrice = Number(deliveryPriceSum);
        const totalPrice = Math.max(0, productsPrice + deliveryPrice);
        return { deliveryPrice, totalPrice };
    },
}));
//# sourceMappingURL=order.js.map