import { factories } from '@strapi/strapi';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getTemplate = (templatePath) =>
  fs.readFileSync(
    path.join(__dirname, '../../../../mail', templatePath),
    'utf8'
  );

export default factories.createCoreController(
  'api::form-request.form-request',
  ({ strapi }: any) => ({
    async create(ctx) {
      try {
        const { data } = ctx.request.body;
        const adminTemplate = getTemplate('/admin/templateRequest.html');
        const { refs } = await strapi.db
          .query('api::misc.misc')
          .findOne({ populate: { refs: true } });
        const { field1: adminEmails } = refs.find(
          (i) => i.slug === 'adminEmails'
        );
        const siteName = 'ecotermix.octweb.ru';

        // Send an email to user
        // await strapi
        //   .plugin('email')
        //   .service('email')
        //   .sendTemplatedEmail(
        //     { to: adminEmails },
        //     {
        //       subject: `Request: ${siteName}`,
        //       text: `Request: ${siteName}`,
        //       html: adminTemplate,
        //     },
        //     {
        //       ...data,
        //       logo: `https://ecotermix.octweb.ru/strapi/uploads/logo_7a7c196b2b.png`,
        //     }
        //   );
      } catch (e) {
        console.log(
          'Error in custom controller api::form-request.form-request:\n',
          e
        );
      } finally {
        return await super.create(ctx);
      }
    },
  })
);
