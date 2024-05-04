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
        {
          data: { paymentStatus: PaymentStatuses.PAID },
          populate: ['cart.product'],
        },
      );

      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
        polling: true,
      });

      const orderCartString = order.cart.map((i) => i.product.name);

      bot
        .sendMessage(
          process.env.TELEGRAM_ADMIN_CHAT_ID,
          `*Заказ №${order.id}*\n\n
          *Состав заказа:*\n
          _Пицца с пармской ветчиной_ x1, 450р\n
          _Фуагра_ x1, 1000р\n_Фаршированный острый перчик_ x3, 750р\n
          _Суп с горохом и копченостями_ x2 500р\n
          _Столовые приборы_ x3, 0р\n\n
          Цена товаров: 2700р\n
          Цена доставки: 300р\n
          Скидка на доставку: 0р\n
          *__Итоговая цена__: 3000р*\n\n
          *Клиент:*\n
          Василий В, [89218601111](89218601111)\n\n
          *Адрес доставки:*\n
          Иоанна кронштадтского 7, кв 31, 1 подъезд, 3 этаж, домофон есть`,
          {
            parse_mode: 'MarkdownV2',
          },
        )
        .catch((error) => {
          console.error(
            'Ошибка при отправке telegram-сообщения администратору:',
            error.message,
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
