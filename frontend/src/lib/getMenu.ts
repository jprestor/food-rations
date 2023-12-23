import { type MenuItem } from '@/models/misc';

export function getMenu(type: 'header' | 'footer', menu: MenuItem[]) {
  switch (type) {
    case 'header':
      return menu.filter((menuItem) => menuItem.isInHeader);
    case 'footer':
      return menu.filter((menuItem) => menuItem.isInFooter);

    default:
      return [];
  }
}
