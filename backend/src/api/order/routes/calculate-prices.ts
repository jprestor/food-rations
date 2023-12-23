export default {
  routes: [
    {
      method: 'GET',
      path: '/order/calculate-prices',
      handler: 'calculate-prices.getOrderPrices',
    },
  ],
};
