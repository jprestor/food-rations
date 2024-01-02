/**
 * cart service
 */
import { factories } from '@strapi/strapi';
import _ from 'lodash';
import utils from '@strapi/utils';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';

const { ApplicationError } = utils.errors;

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

type Variant = { id: number; price: number };

type Product = {
  id: number;
  categories: { slug: string }[];
};

type CartItem = {
  product: Product;
  cartItemPrice: number;
  count?: number;
};

type Cart = {
  id: number;
  items: CartItem[];
  removed: CartItem[];
  totalPrice: number;
};

const populateCart: any = [
  'items.product.categories',
  'items.product.image',
  'removed.product.categories',
  'removed.product.image',
];

const calcItemPrice = (productPrice: number, count: number) =>
  productPrice * count;

const calcTotalPrice = (items: CartItem[]) =>
  items.reduce((acc: number, { cartItemPrice }) => acc + cartItemPrice, 0);

const getProductEntry = async (id: number): Promise<any> =>
  await strapi.entityService.findOne('api::product.product', id, {
    populate: ['product.image', 'categories'],
  });

const getCartEntry = async (uuid: string): Promise<Cart | null> =>
  await strapi.db.query('api::cart.cart').findOne({
    where: { uuid },
    populate: populateCart,
  });

const createCartEntry = async (data): Promise<any> =>
  await strapi.entityService.create('api::cart.cart', {
    data,
    populate: populateCart,
  });

const updateCartEntry = async (id: number, data): Promise<any> =>
  await strapi.entityService.update('api::cart.cart', id, {
    data,
    populate: populateCart,
  });

export default factories.createCoreService(
  'api::order.order',
  ({ strapi }) => ({
    async getCart(uuid: string) {
      const cart = await getCartEntry(uuid);
      if (!cart) {
        return null;
      }
      return this.updateCart(cart);
    },

    async updateCart(cart: Cart): Promise<Cart> {
      return updateCartEntry(cart.id, {
        ...cart,
        totalPrice: calcTotalPrice(cart.items),
      });
    },

    async createCart({ uuid, items }: { uuid: string; items: CartItem[] }) {
      const cart = await createCartEntry({
        uuid,
        items,
        removed: [],
      });

      return this.updateCart(cart);
    },

    // - Если нет корзины - создаёт корзнину
    // - Если не передан count - удаляет из корзины
    // - Если товар в корзине - обновляет count
    // - Если товара нет корзине - добавляет товар
    async addToCart({
      uuid,
      productId,
      count,
    }: {
      uuid: string;
      productId: number;
      count?: number;
    }) {
      const [cart, product] = await Promise.all([
        getCartEntry(uuid),
        getProductEntry(productId),
      ]);
      const cartItemPrice = calcItemPrice(product.price, count);
      const newItem = { product, count, cartItemPrice };

      if (!cart) {
        return this.createCart({ uuid, items: [newItem] });
      }

      // Удаляем если кол-во товара 0
      if (count < 1) {
        return this.removeFromCart({ uuid, productId });
      }

      const { items, removed } = cart;
      const itemInCart = items.find((i) => i.product.id === productId);
      const newRemoved = removed.filter((i) => i.product.id === productId);

      if (itemInCart) {
        const itemInCartIndex = _.findIndex(items, {
          product: { id: productId },
        });

        return this.updateCart({
          ...cart,
          items: [
            ...items.slice(0, itemInCartIndex),
            newItem,
            ...items.slice(itemInCartIndex + 1),
          ],
          removed: newRemoved,
        });
      }

      return this.updateCart({
        ...cart,
        items: [newItem, ...items],
        removed: newRemoved,
      });
    },

    async addToCartMultiple({
      uuid,
      items,
    }: {
      uuid: string;
      items: CartItem[];
    }) {
      const cart = await getCartEntry(uuid);

      const newItems = await items.reduce(
        async (acc: Promise<CartItem[]>, item: CartItem) => {
          const product = await getProductEntry(item.product.id);
          const cartItemPrice = calcItemPrice(product.price, item.count);
          const newItem = {
            product,
            count: item.count,
            cartItemPrice,
          };
          return [...(await acc), newItem];
        },
        Promise.resolve([]),
      );

      if (!cart) {
        return this.createCart({ uuid, items: newItems });
      }

      return this.updateCart({
        ...cart,
        items: newItems,
        removed: [],
      });
    },

    async removeFromCart({
      uuid,
      productId,
    }: {
      uuid: string;
      productId: number;
    }) {
      const cart = await getCartEntry(uuid);
      const { items, removed } = cart;
      const targetItem = items.find((i) => i.product.id === productId);

      if (!targetItem) {
        return this.updateCart(cart);
      }

      return this.updateCart({
        ...cart,
        items: items.filter((i) => i.product.id !== productId),
        removed: [
          _.omit(targetItem, 'id'),
          ...removed.filter((i) => i.product.id !== productId),
        ],
      });
    },

    async restoreFromDeleted({
      uuid,
      productId,
    }: {
      uuid: string;
      productId: number;
    }) {
      const cart = await getCartEntry(uuid);
      const { items, removed } = cart;
      const targetItem = removed.find((i) => i.product.id === productId);

      if (!targetItem) {
        return this.updateCart(cart);
      }

      return this.updateCart({
        ...cart,
        items: [targetItem, ...items],
        removed: removed.filter((i) => i.product.id !== productId),
      });
    },

    async setEmptyCart({ uuid }: { uuid: string }) {
      const cart = await getCartEntry(uuid);

      if (!cart) {
        return this.createCart({ uuid, items: [] });
      }

      return this.updateCart({
        ...cart,
        items: [],
        removed: [],
      });
    },
  }),
);
