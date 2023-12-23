"use strict";
/**
 * mailing-letter controller
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::mailing-letter.mailing-letter', ({ strapi }) => ({
    async testSendMailingLetter(_a) {
        var { request } = _a, ctx = __rest(_a, ["request"]);
        try {
            const { userEmail, templateName } = request.body;
            return await strapi
                .service('api::mailing-letter.mailing-letter')
                .sendMailingLetter(userEmail, templateName);
        }
        catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },
}));
//# sourceMappingURL=mailing-letter.js.map