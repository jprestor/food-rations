const { v4: uuidv4 } = require('uuid');

export default (config, { strapi }) => {
  return async (ctx, next) => {
    const { session } = ctx;

    if (!session?.uuid) {
      session.uuid = uuidv4();
    }

    await next();
  };
};
