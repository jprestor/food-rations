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

      const { street, house, coords } = address;
      const cart = await strapi.db.query('api::cart.cart').findOne({
        where: { uuid: session.uuid },
        populate: ['items.product.image'],
      });

      let deliveryAddressCoords: number;
      if (!coords) {
        deliveryAddressCoords = await strapi
          .service('api::order.order')
          .getCoordsFromAddress(street, house);
      }
      const { cartPrice, deliveryPrice, deliveryDiscount, totalPrice } =
        await strapi
          .service('api::order.order')
          .getOrderPrices(deliveryAddressCoords);

      // Create order
      const newOrder = await strapi.entityService.create('api::order.order', {
        data: {
          status: 1, // New
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
      await strapi.service('api::cart.cart').setEmptyCart();
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
