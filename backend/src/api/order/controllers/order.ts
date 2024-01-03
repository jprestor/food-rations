import { factories } from '@strapi/strapi';
import _ from 'lodash';

export default factories.createCoreController(
  'api::order.order',
  ({ strapi }) => ({
    async create(ctx) {
      const { request, session, state } = ctx;
      const { phone, name, address, comment } = request.body.data;
      const user = state.user;

      if (!phone || !name || !address) {
        return ctx.badRequest('Some fields are not provided in request');
      }

      const { street, house } = address;
      const cart = await strapi.db.query('api::cart.cart').findOne({
        where: { uuid: session.uuid },
        populate: ['items.product.image'],
      });

      if (cart.items.length < 1) {
        return ctx.badRequest('Корзина пуста');
      }

      const deliveryAddressCoords = await strapi
        .service('api::order.order')
        .getCoordsFromAddress(street, house);

      const deliveryZone: { cost: number } | undefined = await strapi
        .service('api::order.order')
        .getUserDeliveryZone(deliveryAddressCoords);

      // Check is delivery available
      if (!deliveryZone) {
        return ctx.badRequest('Адрес не входит в зону доставки');
      }

      const { cartPrice, deliveryPrice, deliveryDiscount, totalPrice } =
        await strapi.service('api::order.order').getOrderPrices(deliveryZone);

      // Create order
      const newOrder = await strapi.entityService.create('api::order.order', {
        data: {
          executionStatus: 1, // New
          // paymentStatus: 1, // Неоплачен
          user,
          userId: user.id,
          phone,
          name,
          address,
          comment,
          cartPrice,
          deliveryPrice,
          deliveryDiscount,
          totalPrice,
          cart: cart.items,
        },
        populate: '*',
      });

      // Clear cart
      await strapi
        .service('api::cart.cart')
        .setEmptyCart({ uuid: session.uuid });

      // Send email to user
      if (user.email) {
        await strapi
          .service('api::mailing-letter.mailing-letter')
          .sendMailingLetter(user.email, 'user_order_created');
      }

      return newOrder;
    },
  }),
);
