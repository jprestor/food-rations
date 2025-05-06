const { sanitize } = require('@strapi/utils');
const _ = require('lodash');
const axios = require('axios');

const random4Digit = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

module.exports = {
  authService: {
    async fetchUser(phone, populate) {
      const userSchema = strapi.getModel('plugin::users-permissions.user');

      const user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { phone }, populate });

      if (!user) {
        return user;
      }

      return sanitize.sanitizers.defaultSanitizeOutput(userSchema, user);
    },

    async createUser(phone, name, populate) {
      const authenticatedRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'authenticated' } });

      const newUser = {
        username: name || phone,
        phone,
        name,
        role: { id: authenticatedRole.id },
      };

      return strapi
        .query('plugin::users-permissions.user')
        .create({ data: newUser, populate });
    },

    async user(phone, name, populate = ['role']) {
      const user = await this.fetchUser(phone, populate);
      return user ? user : this.createUser(phone, name, populate);
    },

    async createCode(phone) {
      const codesService = strapi.query('plugin::sms-auth.code');
      await codesService.update({
        where: { phone, isActive: true },
        data: { isActive: false },
      });

      const codeInfo = {
        phone,
        body: random4Digit(),
      };

      return codesService.create({ data: codeInfo });
    },

    updateCodeOnLogin(code) {
      const codesService = strapi.query('plugin::sms-auth.code');
      return codesService.update({
        where: { id: code.id },
        data: { isActive: false, loginDate: new Date() },
      });
    },

    async isCodeValid(code) {
      const expirePeriod = 60000;
      const codeDate = new Date(code.createdAt).getTime() / 1000;
      const nowDate = new Date().getTime() / 1000;
      return nowDate - codeDate <= expirePeriod;
    },

    async deactivateCode(code) {
      const codesService = strapi.query('plugin::sms-auth.code');
      await codesService.update({
        where: { id: code.id },
        data: { isActive: false },
      });
    },

    fetchCode(code, phone) {
      const codesService = strapi.query('plugin::sms-auth.code');
      return codesService.findOne({
        where: { body: Number(code), phone },
      });
    },

    async sendLoginCode(code) {
      const msg = `Ваш код для входа на сайт: ${code.body}`;
      const apiId = 'A4558099-42AE-22DA-6FD3-B8F27E1C6637';

      console.log('code.phone', code.body);
      console.log('code.phone', code.phone);

      const response = await axios.get(
        `https://sms.ru/sms/send?api_id=${apiId}&to=${code.phone}&msg=${msg}&json=1`,
      );

      console.log('response.data', response.data);

      return response.data;
    },
  },
};
