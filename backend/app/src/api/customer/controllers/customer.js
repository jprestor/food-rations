"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getOrCreate(ctx) {
        try {
            const { phone } = ctx.request.body;
            const { authService } = strapi.plugin('sms-auth').services;
            const user = await authService.user(phone, null, ['addresses']);
            ctx.send(user);
        }
        catch (e) {
            return ctx.badRequest('Error in getUser services', e);
        }
    },
});
//# sourceMappingURL=customer.js.map