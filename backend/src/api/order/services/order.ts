/**
 * order service
 */

import { factories } from '@strapi/strapi';
import * as turf from '@turf/turf';
import axios from 'axios';

type OrderPrices = {
  cartTotalPrice: number | null;
  deliveryPrice: number | null;
  deliveryDiscount: number | null;
  totalPrice: number | null;
};

export default factories.createCoreService(
  'api::order.order',
  ({ strapi }) => ({
    // Возвращает тотал цен
    async getOrderPrices(deliveryZone?: {
      cost: number;
    }): Promise<OrderPrices> {
      const ctx = strapi.requestContext.get();
      const { session } = ctx;
      const cart = await strapi.service('api::cart.cart').getCart(session.uuid);
      const cartTotal = cart?.totalPrice || null;

      const prices = {
        cartTotalPrice: cartTotal,
      };

      if (!deliveryZone) {
        return {
          ...prices,
          deliveryPrice: null,
          deliveryDiscount: null,
          totalPrice: cartTotal,
        };
      }

      const { deliveryPrice, deliveryDiscount } = await strapi
        .service('api::order.order')
        .getDeliveryPrice({ cartTotal, deliveryZone });

      return {
        ...prices,
        deliveryPrice,
        deliveryDiscount,
        totalPrice: cartTotal ? cartTotal + deliveryPrice : null,
      };
    },

    // Возвращает цену доставки заказа
    async getDeliveryPrice({
      cartTotal = 0,
      deliveryZone,
    }: {
      cartTotal: number;
      deliveryZone: { cost: number };
    }) {
      const misc = await strapi.entityService.findMany('api::misc.misc', {
        populate: ['deliveryData.zonePrices'],
      });
      const { deliveryData } = misc;
      const deliveryZonePrice = deliveryZone.cost;
      const { cartAmountForDeliveryDiscount, deliveryDiscountAmount } =
        deliveryData;

      const deliveryDiscount =
        cartTotal >= cartAmountForDeliveryDiscount ? deliveryDiscountAmount : 0;
      const deliveryPrice = Math.max(0, deliveryZonePrice - deliveryDiscount);

      return { deliveryPrice, deliveryDiscount };
    },

    // Возвращает зону доставки по координатам адреса
    async getUserDeliveryZone(
      deliveryAddressCoords?: number[],
    ): Promise<{ cost: number } | null> {
      if (!deliveryAddressCoords) {
        return null;
      }

      const misc = await strapi.entityService.findMany('api::misc.misc', {
        populate: ['deliveryData.zonePrices'],
      });
      const { zonePrices } = misc.deliveryData;

      const zone = zonePrices.find(({ polygon }) => {
        const addressPoint = turf.point(deliveryAddressCoords);
        const deliveryZone = turf.polygon(polygon as []);
        return turf.booleanPointInPolygon(addressPoint, deliveryZone);
      });

      return zone || null;
    },

    // Получает координаты объекта по его адресу и возращает их
    async getCoordsFromAddress(street: string, house: string) {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.YMAPS_API_KEY}&geocode=Казань,+${street}+улица,+дом+${house}&format=json&kind=street&results=1`,
      );
      // Test: https://geocode-maps.yandex.ru/1.x/?apikey=YOUR_API_KEY&geocode=Москва,+Тверская+улица,+дом+7&format=json
      const { featureMember } = res.data.response.GeoObjectCollection;
      const [first] = featureMember;
      const coordsString = first.GeoObject.Point.pos;
      return coordsString.split(' ').reverse().map(Number);
    },
  }),
);
