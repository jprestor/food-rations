/**
 * calculate-order-prices service
 */

export default ({ strapi }) => ({
  async getOrderPrices(ctx): Promise<{
    cartPrice: number;
    deliveryPrice: number | null;
    deliveryDiscount: number | null;
    totalPrice: number | null;
  }> {
    const { request, session } = ctx;
    const { coords: coordsString } = request.query;

    if (!coordsString) {
      const cart = await strapi.service('api::cart.cart').getCart(session.uuid);
      const cartPrice = cart?.totalPrice || null;
      return {
        cartPrice,
        deliveryPrice: null,
        deliveryDiscount: null,
        totalPrice: cartPrice,
      };
    }

    const deliveryAddressCoords = JSON.parse(coordsString);
    const deliveryZone: { cost: number } | undefined = await strapi
      .service('api::order.order')
      .getUserDeliveryZone(deliveryAddressCoords);

    if (!deliveryZone) {
      return ctx.badRequest('Адрес не входит в зону доставки');
    }

    const prices = await strapi
      .service('api::order.order')
      .getOrderPrices(deliveryZone);

    return prices;
  },
});
