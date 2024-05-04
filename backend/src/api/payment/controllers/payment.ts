import TelegramBot from 'node-telegram-bot-api';

import { PaymentStatuses } from '../../../../constants';
import { escapeTelegramEntities } from '../utils';

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
          populate: {
            cart: { populate: { product: true } },
            user: true,
            address: true,
          },
        },
      );

      // Send telegram message for admin
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
        // polling: true,
      });

      /*
        `*Заказ №${order.id}*\n\n
        *Состав заказа:*\n
        _Пицца с пармской ветчиной_ x1, 450р\n
        _Фуагра_ x1, 1000р\n
        _Фаршированный острый перчик_ x3, 750р\n
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
      */

      const cartString = order.cart
        .map((i) => `_${i.product.name}_ x${i.count}, ${i.cartItemPrice}р`)
        .join('\n');

      const userName = escapeTelegramEntities(order.name);
      const userPhone = escapeTelegramEntities(order.phone);

      let addressString = `${order.address.street} ${order.address.house}`;
      if (order.address.apartment) {
        addressString += `, кв ${order.address.apartment}`;
      }
      if (order.address.entrance) {
        addressString += `, ${order.address.entrance} подъезд`;
      }
      if (order.address.floor) {
        addressString += `, ${order.address.floor} этаж`;
      }
      if (order.address.intercom) {
        addressString += `, домофон ${order.address.intercom}`;
      }

      const orderComment = order.comment
        ? `\n\n*Комментарий к заказу:*\n${escapeTelegramEntities(
            order.comment,
          )}`
        : '';

      console.log('orderComment', orderComment);

      const messageToAdminChat = `*Заказ №${order.id}*

*Состав заказа:*
${cartString}

Цена товаров: ${order.cartTotalPrice}р
Цена доставки: ${order.deliveryPrice}р
Скидка на доставку: ${order.deliveryDiscount}р
*__Итоговая цена__: ${order.totalPrice}р*

*Клиент:*
ФИО: ${userName}
Телефон: [${userPhone}](${userPhone})

*Адрес доставки:*
${addressString}${orderComment}
      `;

      bot
        .sendMessage(process.env.TELEGRAM_ADMIN_CHAT_ID, messageToAdminChat, {
          parse_mode: 'MarkdownV2',
        })
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
};
