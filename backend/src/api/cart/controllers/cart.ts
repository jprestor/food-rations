import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::cart.cart',
  ({ strapi }) => ({
    getCart: async (ctx) => {
      const { session } = ctx;
      const cart = await strapi.service('api::cart.cart').getCart(session.uuid);
      return cart;
    },

    addToCart: async ({ request, session }) => {
      const { id, count } = request.body;
      return await strapi.service('api::cart.cart').addToCart({
        uuid: session.uuid,
        productId: id,
        count,
      });
    },

    addToCartMultiple: async ({ request, session }) => {
      return await strapi.service('api::cart.cart').addToCartMultiple({
        uuid: session.uuid,
        items: request.body.items,
      });
    },

    removeFromCart: async (ctx) => {
      const { request, session } = ctx;
      const { id } = request.body;

      if (!id && !session.uuid) {
        return ctx.badRequest('No product id, or session uuid');
      }

      const cart = await strapi.service('api::cart.cart').removeFromCart({
        uuid: session.uuid,
        productId: id,
      });

      return cart;
    },

    restoreFromDeleted: async (ctx) => {
      const { request, session } = ctx;
      const { id } = request.body;

      if (!id && !session.uuid) {
        return ctx.badRequest('No product id, or session uuid');
      }

      const cart = await strapi.service('api::cart.cart').restoreFromDeleted({
        uuid: session.uuid,
        productId: id,
      });

      return cart;
    },

    setEmptyCart: async ({ request, session }) => {
      const cart = await strapi.service('api::cart.cart').setEmptyCart({
        uuid: session.uuid,
      });

      return cart;
    },
  }),
);
