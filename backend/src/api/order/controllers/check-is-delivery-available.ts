/**
 * calculate-order-prices service
 */

export default {
  async checkIsDeliveryAvailable(ctx) {
    const { request } = ctx;
    const coordsString = request.query.coords;

    if (!coordsString) {
      return ctx.badRequest(
        'No delivery address coordinates is provided in request',
      );
    }

    const deliveryAddressCoords = JSON.parse(coordsString);
    const deliveryZone: { cost: number } | undefined = await strapi
      .service('api::order.order')
      .getUserDeliveryZone(deliveryAddressCoords);

    if (!deliveryZone) {
      return ctx.badRequest('Address is not in delivery zone');
    }

    return deliveryZone;
  },
};
