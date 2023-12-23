import _ from 'lodash';
import { factories } from '@strapi/strapi';
const { readFile } = require('node:fs/promises');
const path = require('path');

export default factories.createCoreService(
  'api::mailing-letter.mailing-letter',
  ({ strapi }) => {
    return {
      async getTemplateHtml(templateName) {
        return await readFile(
          path.join(
            strapi.dirs.app.root,
            '/assets/mailing-templates',
            `${templateName}.html`
          ),
          'utf8'
        );
      },

      async getDataForTemplate(templateName) {
        return await strapi.db
          .query('api::mailing-letter.mailing-letter')
          .findOne({
            where: { templateName },
          });
      },

      async sendMailingLetter(
        userEmail: string,
        templateName:
          | 'user_order_completed'
          | 'user_order_created'
          | 'user_payment_success',
        context: any
      ) {
        const html = await this.getTemplateHtml(templateName);
        const data = await this.getDataForTemplate(templateName);
        const { subject, title, text, notice } = data;

        return await strapi.plugin('email').service('email').sendTemplatedEmail(
          {
            // required
            to: userEmail,
          },
          {
            subject,
            text: subject,
            html,
          },
          { title, text, notice }
        );
      },
    };
  }
);
