/**
 * order service
 */

import { factories } from '@strapi/strapi';
import utils from '@strapi/utils';
import * as turf from '@turf/turf';
import axios from 'axios';

const { ApplicationError } = utils.errors;

export default factories.createCoreService(
  'api::order.order',
  ({ strapi }) => ({
    // Возвращает тотал цен
    async getOrderPrices(deliveryZone: { cost: number }) {
      const ctx = strapi.requestContext.get();
      const { session } = ctx;
      const cart = await strapi.service('api::cart.cart').getCart(session.uuid);
      const cartPrice = cart?.totalPrice || null;
      const { deliveryPrice, deliveryDiscount } = await strapi
        .service('api::order.order')
        .getDeliveryPrice({
          cartPrice,
          deliveryZone,
        });
      const totalPrice = cartPrice ? cartPrice + deliveryPrice : null;

      return { cartPrice, deliveryPrice, deliveryDiscount, totalPrice };
    },

    // Возвращает цену доставки заказа
    async getDeliveryPrice({
      cartPrice = 0,
      deliveryZone,
    }: {
      cartPrice: number;
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
        cartPrice >= cartAmountForDeliveryDiscount ? deliveryDiscountAmount : 0;
      const deliveryPrice = Math.max(0, deliveryZonePrice - deliveryDiscount);

      return { deliveryPrice, deliveryDiscount };
    },

    // Возвращает зону доставки по координатам адреса
    async getUserDeliveryZone(
      deliveryAddressCoords: number[],
    ): Promise<{ cost: number } | undefined> {
      const misc = await strapi.entityService.findMany('api::misc.misc', {
        populate: ['deliveryData.zonePrices'],
      });
      const zonePrices = misc.deliveryData.zonePrices;
      const zone = zonePrices.find(({ polygon }) => {
        const addressPoint = turf.point(deliveryAddressCoords);
        const deliveryZone = turf.polygon(polygon as []);
        return turf.booleanPointInPolygon(addressPoint, deliveryZone);
      });

      return zone;
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
