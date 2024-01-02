export default ({ env }) => ({
  url: env('ADMIN_URL'), // Url of your admin panel. Default value: /admin. Note: If the url is relative, it will be concatenated with url.
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
});
