"use strict";
/**
 * cart service
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = __importDefault(require("@strapi/utils"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const { ApplicationError } = utils_1.default.errors;
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(isBetween_1.default);
exports.default = () => {
    const populateCart = [
        'items.product.categories',
        'items.product.image',
        'removed.product.categories',
        'removed.product.image',
    ];
    const calcItemPrice = (productPrice, count) => productPrice * count;
    const calcTotalPrice = (items) => items.reduce((acc, { cartItemPrice }) => acc + cartItemPrice, 0);
    const getProductEntry = async (id) => await strapi.entityService.findOne('api::product.product', id, {
        populate: ['product.image', 'categories'],
    });
    const getCartEntry = async (uuid) => await strapi.db.query('api::cart.cart').findOne({
        where: { uuid },
        populate: populateCart,
    });
    const createCartEntry = async (data) => await strapi.entityService.create('api::cart.cart', {
        data,
        populate: populateCart,
    });
    const updateCartEntry = async (id, data) => await strapi.entityService.update('api::cart.cart', id, {
        data,
        populate: populateCart,
    });
    return {
        async getCart(uuid) {
            const cart = await getCartEntry(uuid);
            if (!cart) {
                throw new ApplicationError('No cart');
            }
            return this.updateCart(cart);
        },
        async updateCart(cart) {
            return updateCartEntry(cart.id, Object.assign(Object.assign({}, cart), { totalPrice: calcTotalPrice(cart.items) }));
        },
        async createCart({ uuid, items }) {
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
        async addToCart({ uuid, productId, count, }) {
            const cart = await getCartEntry(uuid);
            const product = await getProductEntry(productId);
            const cartItemPrice = calcItemPrice(product.price, count);
            const newItem = { product, count, cartItemPrice };
            if (!cart) {
                return this.createCart({ uuid, items: [newItem] });
            }
            const { items, removed } = cart;
            const itemInCart = items.find((i) => i.product.id === productId);
            const newRemoved = removed.filter((i) => i.product.id === productId);
            if (itemInCart) {
                const itemInCartIndex = lodash_1.default.findIndex(items, {
                    product: { id: productId },
                });
                return this.updateCart(Object.assign(Object.assign({}, cart), { items: [
                        ...items.slice(0, itemInCartIndex),
                        newItem,
                        ...items.slice(itemInCartIndex + 1),
                    ], removed: newRemoved }));
            }
            return this.updateCart(Object.assign(Object.assign({}, cart), { items: [newItem, ...items], removed: newRemoved }));
        },
        async addToCartMultiple({ uuid, items, }) {
            const cart = await getCartEntry(uuid);
            const newItems = await items.reduce(async (acc, item) => {
                const product = await getProductEntry(item.product.id);
                const cartItemPrice = calcItemPrice(product.price, item.count);
                const newItem = {
                    product,
                    count: item.count,
                    cartItemPrice,
                };
                return [...(await acc), newItem];
            }, Promise.resolve([]));
            if (!cart) {
                return this.createCart({ uuid, items: newItems });
            }
            return this.updateCart(Object.assign(Object.assign({}, cart), { items: newItems, removed: [] }));
        },
        async removeFromCart({ uuid, productId, }) {
            const cart = await getCartEntry(uuid);
            const { items, removed } = cart;
            const targetItem = items.find((i) => i.product.id === productId);
            if (!targetItem) {
                return this.updateCart(cart);
            }
            return this.updateCart(Object.assign(Object.assign({}, cart), { items: items.filter((i) => i.product.id !== productId), removed: [
                    targetItem,
                    ...removed.filter((i) => i.product.id !== productId),
                ] }));
        },
        async restoreFromDeleted({ uuid, productId, }) {
            const cart = await getCartEntry(uuid);
            const { items, removed } = cart;
            const targetItem = removed.find((i) => i.product.id === productId);
            if (!targetItem) {
                return this.updateCart(cart);
            }
            return this.updateCart(Object.assign(Object.assign({}, cart), { items: [targetItem, ...items], removed: removed.filter((i) => i.product.id !== productId) }));
        },
        async setEmptyCart({ uuid }) {
            const cart = await getCartEntry(uuid);
            if (!cart) {
                return this.createCart({ uuid, items: [] });
            }
            return this.updateCart(Object.assign(Object.assign({}, cart), { items: [], removed: [] }));
        },
    };
};
//# sourceMappingURL=cart.js.map