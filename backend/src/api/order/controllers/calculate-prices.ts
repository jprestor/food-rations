/**
 * calculate-order-prices service
 */

import { factories } from '@strapi/strapi';
import turf from '@turf/turf';

export default factories.createCoreController(
  'api::order.order',
  ({ strapi }) => ({
    async getOrderPrices({ request, session }) {
      const { deliveryAddressCoords } = request.query;
      const cart = strapi.service('api::cart.cart').getCart(session.uuid);
      const misc = await strapi.entityService.findMany('api::misc.misc', {
        populate: ['deliveryData.zonePrices'],
      });
      const cartTotalPrice = cart?.totalPrice || 0;
      const { zonePrices, cartAmountForDeliveryDiscount, deliveryDiscount } =
        misc.deliveryData;
      const deliveryZone = zonePrices.find(
        (i) => i.id === JSON.parse(deliveryAddressCoords),
      );
      const discount =
        cartTotalPrice >= cartAmountForDeliveryDiscount ? deliveryDiscount : 0;
      const deliveryCost = Math.max(0, deliveryZone.cost - deliveryDiscount);
      const totalPrice = cartTotalPrice + deliveryCost;

      return {
        deliveryCost,
        discount,
        totalPrice,
      };
    },
  }),
);
