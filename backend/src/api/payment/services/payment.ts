import { factories } from '@strapi/strapi';
import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';
import { v4 as uuid } from 'uuid';
import { CONFIRM_RETURN_URL } from '../../../../constants';

export default factories.createCoreService(
  'api::order.order',
  ({ strapi }) => ({
    async _createPayment(payload: ICreatePayment) {
      const checkout = new YooCheckout({
        shopId: process.env.YOOKASSA_SHOP_ID,
        secretKey: process.env.YOOKASSA_SECRET_KEY,
      });

      const idempotenceKey = uuid();

      const payment = await checkout.createPayment(payload, idempotenceKey);

      return payment;
    },

    async createOrderPayment(orderId: number) {
      const order = await strapi.entityService.findOne(
        'api::order.order',
        orderId,
      );

      const payload: ICreatePayment = {
        amount: {
          value: String(order.totalPrice),
          currency: 'RUB',
        },
        payment_method_data: {
          type: 'bank_card',
        },
        confirmation: {
          type: 'redirect',
          return_url: `${CONFIRM_RETURN_URL}/${order.id}`,
        },
        description: `Заказ №${order.id}`,
        metadata: {
          orderId: order.id,
        },
      };

      return strapi.service('api::payment.payment')._createPayment(payload);
    },
  }),
);
