"use strict";
/**
 * cart router
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/cart/getCart',
            handler: 'cart.getCart',
        },
        {
            method: 'POST',
            path: '/cart/addToCart',
            handler: 'cart.addToCart',
        },
        {
            method: 'POST',
            path: '/cart/addToCartMultiple',
            handler: 'cart.addToCartMultiple',
        },
        {
            method: 'POST',
            path: '/cart/removeFromCart',
            handler: 'cart.removeFromCart',
        },
        {
            method: 'POST',
            path: '/cart/restoreFromDeleted',
            handler: 'cart.restoreFromDeleted',
        },
        {
            method: 'GET',
            path: '/cart/setEmptyCart',
            handler: 'cart.setEmptyCart',
        },
    ],
};
//# sourceMappingURL=cart.js.map