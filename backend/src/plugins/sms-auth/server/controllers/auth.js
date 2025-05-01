const { sanitize } = require('@strapi/utils');
const _ = require('lodash');

const phoneNumberRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

module.exports = {
  async sendCode(ctx) {
    const { phone, name } = ctx.request.body;
    const { authService } = strapi.plugin('sms-auth').services;

    // Check if the provided identifier is a phone number or not.
    const isPhoneNumber = phoneNumberRegExp.test(phone);

    if (!phone || !isPhoneNumber) {
      return ctx.badRequest('Wrong phone');
    }

    let user;
    try {
      user = await authService.user(phone, name);
    } catch (e) {
      return ctx.badRequest('Error in getUser services', e);
    }

    if (user.blocked) {
      return ctx.badRequest('blocked.user');
    }

    try {
      const code = await authService.createCode(user.phone);
      await authService.sendLoginCode(code); // send sms
      ctx.send({ sent: true }); // Готово - Убрать код и пользователя перед production
    } catch (err) {
      return ctx.badRequest(err);
    }
  },

  async loginByCode(ctx) {
    const { code: loginCode, phone } = ctx.request.body;
    const { authService } = strapi.plugin('sms-auth').services;
    const { user: userService, jwt: jwtService } =
      strapi.plugin('users-permissions').services;

    const code = await authService.fetchCode(loginCode, phone);

    if (!code || !code.isActive) {
      return ctx.badRequest('code.invalid');
    }

    const isValid = await authService.isCodeValid(code);

    if (!isValid) {
      await authService.deactivateCode(code);
      return ctx.badRequest('code.invalid');
    }

    await authService.updateCodeOnLogin(code);

    const user = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ where: { phone: code.phone } });

    if (!user) {
      return ctx.badRequest('wrong.phone');
    }

    if (user.blocked) {
      return ctx.badRequest('blocked.user');
    }

    if (!user.confirmed) {
      await userService.edit(user.id, { confirmed: true });
    }

    const userSchema = strapi.getModel('plugin::users-permissions.user');
    // Sanitize the template's user information
    const sanitizedUserInfo = await sanitize.sanitizers.defaultSanitizeOutput(
      userSchema,
      user,
    );

    ctx.send({
      jwt: jwtService.issue({ id: user.id }),
      user: sanitizedUserInfo,
    });
  },
};
