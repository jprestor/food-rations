// export function escapeTelegramEntities(text) {
//   // Список зарезервированных символов в Telegram и их экранированные значения
//   const reservedChars = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '-': '\\-',
//     '=': '\\=',
//     '|': '\\|',
//     '{': '\\{',
//     '}': '\\}',
//     '(': '\\(',
//     ')': '\\)',
//     '*': '\\*',
//     '+': '\\+',
//     '.': '\\.',
//     '!': '\\!',
//     '`': '\\`',
//     '[': '\\[',
//     ']': '\\]',
//     '~': '\\~',
//     '#': '\\#',
//     //'\n': '\\n', // Экранируем символ переноса строки
//   };

//   // Заменяем все зарезервированные символы и возвращаем обработанный текст
//   return text.replace(/[-[\]{}()*+?.!\\^$|#\s]/g, (char) => {
//     return reservedChars[char] || char;
//   });
// }

export function escapeTelegramEntities(text) {
  // Список зарезервированных символов в Telegram и их экранированные значения
  const reservedChars = {
    '&': '\\&',
    '<': '\\<',
    '>': '\\>',
    '-': '\\-',
    '=': '\\=',
    '|': '\\|',
    '{': '\\{',
    '}': '\\}',
    '(': '\\(',
    ')': '\\)',
    '*': '\\*',
    '+': '\\+',
    '.': '\\.',
    '!': '\\!',
    '`': '\\`',
    '[': '\\[',
    ']': '\\]',
    '~': '\\~',
    '#': '\\#',
    '/': '\\/',
    _: '\\_',
    '\n': '\\n', // Экранируем символ переноса строки
  };

  // Заменяем все зарезервированные символы и возвращаем обработанный текст
  return text.replace(/[&<>\-=[\]{}()*+?.,!`'"/\s]/g, (char) => {
    return reservedChars[char] || char;
  });
}
