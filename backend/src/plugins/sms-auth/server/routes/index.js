module.exports = {
  'content-api': {
    type: 'content-api',
    routes: [
      {
        method: 'POST',
        path: '/login-by-code',
        handler: 'auth.loginByCode',
      },
      {
        method: 'POST',
        path: '/send-code',
        handler: 'auth.sendCode',
      },
    ],
  },
};
