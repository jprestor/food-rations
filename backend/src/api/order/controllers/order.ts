import { factories } from '@strapi/strapi';
import _ from 'lodash';

export default factories.createCoreController(
  'api::order.order',
  ({ strapi }) => ({
    async create({ request, session, state }) {
      const { phone, name, address, comment } = request.body.data;
      const user = state.user;
      const cart = await strapi.db.query('api::cart.cart').findOne({
        where: { uuid: session.uuid },
        populate: ['items.product.image'],
      });
      const orderPrices = await strapi
        .service('api::order.order')
        .getPrices(cart);

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
          cart: cart.items,
          ...orderPrices,
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
