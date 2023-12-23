export default {
  routes: [
    {
      method: 'POST',
      path: '/payment/create',
      handler: 'payment.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/payment/notify',
      handler: 'payment.notify',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
