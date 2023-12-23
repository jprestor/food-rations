/**
 * order service
 */

import { factories } from '@strapi/strapi';

type RefField = string | undefined;

export default factories.createCoreService(
  'api::order.order',
  ({ strapi }) => ({
    async getPrices(productsPrice: number, promocodeID: number) {
      const { refs } = (await strapi.entityService.findMany('api::misc.misc', {
        populate: ['refs.fields'],
      })) as any;
      const deliveryPriceRef = refs.find((i) => i.slug === 'deliveryPrice');
      const deliveryPriceSum: RefField = deliveryPriceRef.fields?.[0]?.value;
      const deliveryPrice = Number(deliveryPriceSum);
      const totalPrice = Math.max(0, productsPrice + deliveryPrice);

      return { deliveryPrice, totalPrice };
    },
  }),
);
