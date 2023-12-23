// Склонение слов decl(count, ['рубль', 'рубля', 'рублей']);
export function decl(count: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ];
}
