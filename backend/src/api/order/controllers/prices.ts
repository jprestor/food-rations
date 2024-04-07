/**
 * calculate-order-prices service
 */

export default ({ strapi }) => ({
  async getOrderPrices(ctx) {
    const { coords }: { coords: string[] | undefined } = ctx.request.query;
    let deliveryZone: { cost: number };

    if (coords) {
      const coordsNormalized = coords.map(Number);

      deliveryZone = await strapi
        .service('api::order.order')
        .getUserDeliveryZone(coordsNormalized);
    }

    const prices = await strapi
      .service('api::order.order')
      .getOrderPrices(deliveryZone);

    return prices;
  },
});
