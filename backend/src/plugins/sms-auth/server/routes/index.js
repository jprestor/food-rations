module.exports = {
  'content-api': {
    type: 'content-api',
    routes: [
      {
        method: 'POST',
        path: '/login',
        handler: 'auth.loginByCode',
      },
      {
        method: 'POST',
        path: '/send-code',
        handler: 'auth.sendCode',
      },
      {
        method: 'GET',
        path: '/test',
        handler: 'auth.test',
      },
    ],
  },
};
