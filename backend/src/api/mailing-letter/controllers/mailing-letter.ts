/**
 * mailing-letter controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::mailing-letter.mailing-letter',
  ({ strapi }) => ({
    async testSendMailingLetter({ request, ...ctx }) {
      try {
        const { userEmail, templateName } = request.body;
        return await strapi
          .service('api::mailing-letter.mailing-letter')
          .sendMailingLetter(userEmail, templateName);
      } catch (err) {
        console.log(err);
        ctx.body = err;
      }
    },
  })
);
