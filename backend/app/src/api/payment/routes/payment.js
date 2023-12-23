"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/payment/create',
            handler: 'payment.create',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/payment/notify',
            handler: 'payment.notify',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
//# sourceMappingURL=payment.js.map