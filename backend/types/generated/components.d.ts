import type { Schema, Attribute } from '@strapi/strapi';

export interface AllCartItem extends Schema.Component {
  collectionName: 'components_all_cart_items';
  info: {
    displayName: '\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u043A\u043E\u0440\u0437\u0438\u043D\u044B';
    icon: 'shopping-cart';
    description: '';
  };
  attributes: {
    product: Attribute.Relation<
      'all.cart-item',
      'oneToOne',
      'api::product.product'
    >;
    count: Attribute.Integer & Attribute.DefaultTo<0>;
    cartItemPrice: Attribute.Integer & Attribute.Required;
  };
}

export interface AllField extends Schema.Component {
  collectionName: 'components_all_fields';
  info: {
    displayName: '\u041F\u043E\u043B\u0435';
    description: '';
  };
  attributes: {
    value: Attribute.String;
  };
}

export interface AllFiles extends Schema.Component {
  collectionName: 'components_all_files';
  info: {
    displayName: '\u0424\u0430\u0439\u043B\u044B';
    icon: 'file-contract';
    description: '';
  };
  attributes: {
    item: Attribute.Media;
  };
}

export interface AllMeta extends Schema.Component {
  collectionName: 'components_all_metas';
  info: {
    displayName: '\u041C\u0435\u0442\u0430-\u0442\u0435\u0433\u0438';
    icon: 'barcode';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    description: Attribute.Text;
  };
}

export interface MiscDeliveryData extends Schema.Component {
  collectionName: 'components_misc_delivery_data';
  info: {
    displayName: '\u0426\u0435\u043D\u0430 \u0437\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443';
    icon: 'book';
    description: '';
  };
  attributes: {
    zonePrices: Attribute.Component<'misc.delivery-zones', true>;
    cartAmountForDeliveryDiscount: Attribute.Integer & Attribute.Required;
    deliveryDiscountAmount: Attribute.Integer & Attribute.Required;
    mapCenter: Attribute.String & Attribute.Required;
  };
}

export interface MiscDeliveryZones extends Schema.Component {
  collectionName: 'components_misc_delivery_zones';
  info: {
    displayName: 'deliveryZones';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    polygon: Attribute.JSON & Attribute.Required;
    cost: Attribute.Integer & Attribute.Required;
    color: Attribute.String &
      Attribute.Required &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface MiscMenu extends Schema.Component {
  collectionName: 'components_all_menus';
  info: {
    displayName: '\u041C\u0435\u043D\u044E';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    isMain: Attribute.Boolean & Attribute.DefaultTo<true>;
    isInHeader: Attribute.Boolean & Attribute.DefaultTo<true>;
    isInFooter: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface MiscMetrics extends Schema.Component {
  collectionName: 'components_all_metrics';
  info: {
    displayName: '\u041C\u0435\u0442\u0440\u0438\u043A\u0438';
    icon: 'archive';
    description: '';
  };
  attributes: {
    yandex_id: Attribute.String;
    google_id: Attribute.String;
    js_code: Attribute.Text;
  };
}

export interface MiscRefs extends Schema.Component {
  collectionName: 'components_all_refs';
  info: {
    displayName: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0430\u0439\u0442\u0430';
    icon: 'arrow-alt-circle-right';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.String & Attribute.Required;
    fields: Attribute.Component<'all.field', true>;
  };
}

export interface MiscSettings extends Schema.Component {
  collectionName: 'components_misc_settings';
  info: {
    displayName: 'Settings';
    icon: 'cog';
    description: '';
  };
  attributes: {
    favicon: Attribute.Media;
    themeColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    logo: Attribute.Media;
    siteName: Attribute.String;
  };
}

export interface MiscSocialNetwork extends Schema.Component {
  collectionName: 'components_all_social_networks';
  info: {
    displayName: '\u0421\u043E\u0446\u0441\u0435\u0442\u0438';
    icon: 'calendar-alt';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface OrderProduct extends Schema.Component {
  collectionName: 'components_order_products';
  info: {
    displayName: '\u0422\u043E\u0432\u0430\u0440';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    product: Attribute.Relation<
      'order.product',
      'oneToOne',
      'api::product.product'
    >;
    count: Attribute.Integer;
  };
}

export interface ProductDayForSale extends Schema.Component {
  collectionName: 'components_product_sales_days';
  info: {
    displayName: 'dayForSale';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    date: Attribute.Date & Attribute.Required;
    title: Attribute.String;
  };
}

export interface ProductNutritionalValue extends Schema.Component {
  collectionName: 'components_product_nutritional_values';
  info: {
    displayName: '\u041F\u0438\u0449\u0435\u0432\u0430\u044F \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C';
    description: '';
  };
  attributes: {
    energy: Attribute.Integer;
    proteins: Attribute.Integer;
    fats: Attribute.Integer;
    carbohydrates: Attribute.Integer;
  };
}

export interface UserAddress extends Schema.Component {
  collectionName: 'components_user_addresses';
  info: {
    displayName: '\u0410\u0434\u0440\u0435\u0441';
    description: '';
  };
  attributes: {
    street: Attribute.String;
    house: Attribute.String;
    apartment: Attribute.String;
    intercom: Attribute.String;
    entrance: Attribute.String;
    floor: Attribute.String;
    addressName: Attribute.String;
  };
}

export interface WidgetsStaticBlock extends Schema.Component {
  collectionName: 'components_widgets_static_blocks';
  info: {
    displayName: '\u0421\u0442\u0430\u0442\u0438\u0447\u043D\u044B\u0439 \u0431\u043B\u043E\u043A';
    icon: 'file-contract';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText;
    gallery: Attribute.Media;
    aside: Attribute.Text;
  };
}

export interface WidgetsWidget extends Schema.Component {
  collectionName: 'components_all_widgets';
  info: {
    displayName: '\u0412\u0438\u0434\u0436\u0435\u0442';
    icon: 'charging-station';
    description: '';
  };
  attributes: {
    widget: Attribute.Relation<
      'widgets.widget',
      'oneToOne',
      'api::widget.widget'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'all.cart-item': AllCartItem;
      'all.field': AllField;
      'all.files': AllFiles;
      'all.meta': AllMeta;
      'misc.delivery-data': MiscDeliveryData;
      'misc.delivery-zones': MiscDeliveryZones;
      'misc.menu': MiscMenu;
      'misc.metrics': MiscMetrics;
      'misc.refs': MiscRefs;
      'misc.settings': MiscSettings;
      'misc.social-network': MiscSocialNetwork;
      'order.product': OrderProduct;
      'product.day-for-sale': ProductDayForSale;
      'product.nutritional-value': ProductNutritionalValue;
      'user.address': UserAddress;
      'widgets.static-block': WidgetsStaticBlock;
      'widgets.widget': WidgetsWidget;
    }
  }
}
