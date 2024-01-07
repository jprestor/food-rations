import { factories } from '@strapi/strapi';
import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';
import { v4 as uuid } from 'uuid';

import { CONFIRM_RETURN_URL } from '../../../../constants';

export default factories.createCoreService(
  'api::order.order',
  ({ strapi }) => ({
    async createPayment(order: any) {
      const checkout = new YooCheckout({
        shopId: process.env.YOOKASSA_SHOP_ID,
        secretKey: process.env.YOOKASSA_SECRET_KEY,
      });

      const idempotenceKey = uuid();

      const createPayload: ICreatePayment = {
        amount: {
          value: String(order.totalPrice),
          currency: 'RUB',
        },
        payment_method_data: {
          type: 'bank_card',
        },
        confirmation: {
          type: 'redirect',
          return_url: CONFIRM_RETURN_URL,
        },
        description: `Заказ №${order.id}`,
        metadata: {
          orderId: order.id,
        },
      };

      const payment = await checkout.createPayment(
        createPayload,
        idempotenceKey,
      );

      return payment;
    },
  }),
);
