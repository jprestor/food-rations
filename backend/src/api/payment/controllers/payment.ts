import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';
import { v4 as uuid } from 'uuid';
import { PaymentStatuses, CONFIRM_RETURN_URL } from '../../../../constants';

export default {
  create: async ({ request, ...ctx }) => {
    const { orderId } = request.body;
    const order = await strapi.entityService.findOne(
      'api::order.order',
      orderId,
    );
    const { totalPrice } = order;

    try {
      const checkout = new YooCheckout({
        shopId: process.env.YOOKASSA_SHOP_ID,
        secretKey: process.env.YOOKASSA_SECRET_KEY,
      });

      const idempotenceKey = uuid();

      const createPayload: ICreatePayment = {
        amount: {
          value: String(totalPrice),
          currency: 'RUB',
        },
        payment_method_data: {
          type: 'bank_card',
        },
        confirmation: {
          type: 'redirect',
          return_url: CONFIRM_RETURN_URL,
        },
        description: `Заказ №${orderId}`,
        metadata: {
          orderId,
        },
      };

      const payment = await checkout.createPayment(
        createPayload,
        idempotenceKey,
      );

      return payment;
    } catch (err) {
      console.log('create controller error', err);
      ctx.body = err;
    }
  },

  notify: async ({ request, ...ctx }) => {
    try {
      const { event, object } = request.body;
      const { orderId } = object.metadata;

      if (event !== 'payment.succeeded') {
        return await strapi.entityService.findOne('api::order.order', orderId);
      }

      // Update order payment status
      const order = await strapi.entityService.update(
        'api::order.order',
        orderId,
        { data: { paymentStatus: PaymentStatuses.Paid } },
      );

      // Send email to user
      const user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { id: order.userId } });

      if (user.email) {
        await strapi
          .service('api::mailing-letter.mailing-letter')
          .sendMailingLetter(user.email, 'user_payment_success');
      }

      return order;
    } catch (err) {
      console.log('notify controller error', err);
      ctx.body = err;
    }
  },
};
