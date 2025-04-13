export default {
  async checkIsDeliveryAvailable(ctx) {
    const { request } = ctx;
    const { street, house } = request.query;

    if (!street || !house) {
      return ctx.badRequest('No address is provided in request');
    }

    try {
      const deliveryAddressCoords = await strapi
        .service('api::order.order')
        .getCoordsFromAddress(street, house);

      const deliveryZone: { cost: number } | undefined = await strapi
        .service('api::order.order')
        .getUserDeliveryZone(deliveryAddressCoords);

      if (!deliveryZone) {
        return ctx.badRequest('Адрес не входит в зону доставки');
      }

      return deliveryZone;
    } catch {
      return ctx.badRequest('Адрес не входит в зону доставки');
    }
  },
};
