export default {
  routes: [
    {
      method: 'GET',
      path: '/orders/prices',
      handler: 'prices.getOrderPrices',
    },
    {
      method: 'GET',
      path: '/orders/check-is-delivery-available',
      handler: 'check-is-delivery-available.checkIsDeliveryAvailable',
    },
  ],
};
