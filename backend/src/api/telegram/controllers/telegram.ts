import TelegramBot from 'node-telegram-bot-api';

/*
*bold \*text*
_italic \*text_
__underline__
~strikethrough~
||spoiler||
*bold _italic bold ~italic bold strikethrough ||italic bold strikethrough spoiler||~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
![👍](tg://emoji?id=5368324170671202286)
`inline fixed-width code`
*/

/*
`Заказ № 1`\n\n
*Состав заказа:*\n
_Пицца с пармской ветчиной_ x1, 450р\n
_Фуагра_ x1, 1000р\n
_Фаршированный острый перчик_ x3, 750р\n
_Суп с горохом и копченостями_ x2 500р\n
_Столовые приборы_ x3, 0р\n\n

Цена товаров: 2700р\n
Цена доставки: 300р\n
Скидка на доставку: 0р\n
*__Итоговая цена__: 3000р*\n\n

*Клиент:*\n
Василий В, [89218601111](89218601111)\n\n

*Адрес доставки:*\n
Иоанна кронштадтского 7, кв 31, 1 подъезд, 3 этаж, домофон есть
*/

export default {
  testBotNotify: async (ctx, next) => {
    try {
      const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

      bot
        .sendMessage(
          process.env.TELEGRAM_ADMIN_CHAT_ID,
          '`Заказ №1`\n\n*Состав заказа:*\n_Пицца с пармской ветчиной_ x1, 450р\n_Фуагра_ x1, 1000р\n_Фаршированный острый перчик_ x3, 750р\n_Суп с горохом и копченостями_ x2 500р\n_Столовые приборы_ x3, 0р\n\nЦена товаров: 2700р\nЦена доставки: 300р\nСкидка на доставку: 0р\n*__Итоговая цена__: 3000р*\n\n*Клиент:*\nВасилий В, [89218601111](89218601111)\n\n*Адрес доставки:*\nИоанна кронштадтского 7, кв 31, 1 подъезд, 3 этаж, домофон есть',
          {
            parse_mode: 'MarkdownV2',
          },
        )
        .catch((error) => {
          console.error(
            'Ошибка при отправке telegram-сообщения администратору:',
            error.message,
          );
        });

      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
};
