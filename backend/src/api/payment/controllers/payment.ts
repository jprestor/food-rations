import { PaymentStatuses } from '../../../../constants';

export default {
  create: async ({ request, ...ctx }) => {
    const { orderId } = request.body;
    const order = await strapi.entityService.findOne(
      'api::order.order',
      orderId,
    );

    try {
      const payment = await strapi
        .service('api::payment.payment')
        .createPayment(order);

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
        { data: { paymentStatus: PaymentStatuses.PAID } },
      );

      // Send email to user
      // const user = await strapi
      //   .query('plugin::users-permissions.user')
      //   .findOne({ where: { id: order.userId } });

      // if (user.email) {
      //   await strapi
      //     .service('api::mailing-letter.mailing-letter')
      //     .sendMailingLetter(user.email, 'user_payment_success');
      // }

      return order;
    } catch (err) {
      console.log('notify controller error', err);
      ctx.body = err;
    }
  },
};
