export default {
  routes: [
    {
      method: 'GET',
      path: '/telegram/testBotNotify',
      handler: 'telegram.testBotNotify',
      config: {
        auth: false,
      },
    },
  ],
};
