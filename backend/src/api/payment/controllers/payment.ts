import TelegramBot from 'node-telegram-bot-api';

import { PaymentStatuses } from '../../../../constants';

export default {
  /* Order payment */
  create: async ({ request, ...ctx }) => {
    const { orderId } = request.body;

    try {
      return strapi.service('api::payment.payment').createOrderPayment(orderId);
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
        return strapi.entityService.findOne('api::order.order', orderId);
      }

      // Update order payment status
      const order = await strapi.entityService.update(
        'api::order.order',
        orderId,
        { data: { paymentStatus: PaymentStatuses.PAID } },
      );

      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
        polling: true,
      });

      bot
        .sendMessage(
          process.env.TELEGRAM_ADMIN_CHAT_ID,
          'Новый заказ. Оплачено',
        )
        .catch((error) => {
          console.error(
            'Ошибка при отправке telegram-сообщения администратору:',
            error,
          );
        });

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

  /* Booking payment */
};
