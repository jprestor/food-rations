"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yoo_checkout_1 = require("@a2seven/yoo-checkout");
const uuid_1 = require("uuid");
const constants_1 = require("constants");
exports.default = {
    create: async (_a) => {
        var { request } = _a, ctx = __rest(_a, ["request"]);
        const { orderID } = request.body;
        const order = await strapi.entityService.findOne('api::order.order', orderID);
        const { totalPrice } = order;
        try {
            const checkout = new yoo_checkout_1.YooCheckout({
                shopId: process.env.YOOKASSA_SHOP_ID,
                secretKey: process.env.YOOKASSA_SECRET_KEY,
            });
            const idempotenceKey = (0, uuid_1.v4)();
            const createPayload = {
                amount: {
                    value: String(totalPrice),
                    currency: 'RUB',
                },
                payment_method_data: {
                    type: 'bank_card',
                },
                confirmation: {
                    type: 'redirect',
                    return_url: constants_1.CONFIRM_RETURN_URL,
                },
                description: `Заказ №${orderID}`,
                metadata: {
                    orderID,
                },
            };
            const payment = await checkout.createPayment(createPayload, idempotenceKey);
            return payment;
        }
        catch (err) {
            console.log('create controller error', err);
            ctx.body = err;
        }
    },
    notify: async (_a) => {
        var { request } = _a, ctx = __rest(_a, ["request"]);
        try {
            const { event, object } = request.body;
            const { orderID } = object.metadata;
            if (event !== 'payment.succeeded') {
                return await strapi.entityService.findOne('api::order.order', orderID);
            }
            // Update order payment status
            const order = await strapi.entityService.update('api::order.order', orderID, { data: { paymentStatus: constants_1.PaymentStatuses.Paid } });
            // Send email to user
            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({ where: { id: order.userID } });
            if (user.email) {
                await strapi
                    .service('api::mailing-letter.mailing-letter')
                    .sendMailingLetter(user.email, 'user_payment_success');
            }
            return order;
        }
        catch (err) {
            console.log('notify controller error', err);
            ctx.body = err;
        }
    },
};
//# sourceMappingURL=payment.js.map