export default ({ env }) => ({
  url: env('SERVER_URL'), // Public url of the server. Required for many different features (ex: reset password, third login providers etc.). Also enables proxy support such as Apache or Nginx
  host: env('HOST', '127.0.0.1'),
  port: env.int('PORT', 1337),
  proxy: true, // Set the koa variable app.proxy. When true, proxy header fields will be trusted.
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
