"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getTemplate = (templatePath) => fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../../mail', templatePath), 'utf8');
exports.default = strapi_1.factories.createCoreController('api::form-request.form-request', ({ strapi }) => ({
    async create(ctx) {
        try {
            const { data } = ctx.request.body;
            const adminTemplate = getTemplate('/admin/templateRequest.html');
            const { refs } = await strapi.db
                .query('api::misc.misc')
                .findOne({ populate: { refs: true } });
            const { field1: adminEmails } = refs.find((i) => i.slug === 'adminEmails');
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
        }
        catch (e) {
            console.log('Error in custom controller api::form-request.form-request:\n', e);
        }
        finally {
            return await super.create(ctx);
        }
    },
}));
//# sourceMappingURL=form-request.js.map