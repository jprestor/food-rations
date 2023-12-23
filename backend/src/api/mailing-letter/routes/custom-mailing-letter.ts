export default {
  routes: [
    {
      method: 'POST',
      path: '/mailing-letters/test/send',
      handler: 'mailing-letter.testSendMailingLetter',
    },
  ],
};
