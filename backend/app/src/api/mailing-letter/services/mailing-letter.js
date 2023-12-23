"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const { readFile } = require('node:fs/promises');
const path = require('path');
exports.default = strapi_1.factories.createCoreService('api::mailing-letter.mailing-letter', ({ strapi }) => {
    return {
        async getTemplateHtml(templateName) {
            return await readFile(path.join(strapi.dirs.app.root, '/assets/mailing-templates', `${templateName}.html`), 'utf8');
        },
        async getDataForTemplate(templateName) {
            return await strapi.db
                .query('api::mailing-letter.mailing-letter')
                .findOne({
                where: { templateName },
            });
        },
        async sendMailingLetter(userEmail, templateName, context) {
            const html = await this.getTemplateHtml(templateName);
            const data = await this.getDataForTemplate(templateName);
            const { subject, title, text, notice } = data;
            return await strapi.plugin('email').service('email').sendTemplatedEmail({
                // required
                to: userEmail,
            }, {
                subject,
                text: subject,
                html,
            }, { title, text, notice });
        },
    };
});
//# sourceMappingURL=mailing-letter.js.map