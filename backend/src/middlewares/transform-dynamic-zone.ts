import _ from 'lodash';
import { type Strapi } from '@strapi/strapi';

const fetchWidgetActions = async (actions: any, strapi: Strapi) => {
  if (!actions) {
    return {};
  }

  try {
    const promises = actions.map((action) => {
      const { apiName, filters, populate, limit, sort } = action;

      return strapi.entityService.findMany(
        `api::${apiName}.${apiName}` as any,
        {
          populate,
          filters,
          limit,
          sort,
        },
      );
    });

    const resolved = await Promise.all(promises);

    return resolved.reduce((acc, data, index) => {
      return { ...acc, [actions[index].fieldName]: data };
    }, {});
  } catch (error) {
    console.log('Error in fetchWidgetActions', error);
    return {};
  }
};

const transformDynamicZone = async (data: any[], strapi: Strapi) => {
  const result = data.reduce(async (acc, item) => {
    if (item.__component === 'widgets.widget') {
      const { widget } = item;
      const dataFromActions = await fetchWidgetActions(widget.actions, strapi);
      const widgetData = {
        componentName: widget.componentName,
        files: widget.files,
        ...widget.data,
        ...dataFromActions,
      };
      return [...(await acc), widgetData];
    }

    const componentName = item.__component.split('.')[1];
    const camel = componentName
      .split('-')
      .map((word: string) => _.capitalize(word))
      .join('');

    return [...(await acc), { ...item, componentName: camel }];
  }, Promise.resolve([]));

  return result;
};

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    await next();

    // ensure body exists, occurs on non existent route
    if (!ctx.body) {
      return;
    }

    // ensure no error returned.
    if (!ctx.body.data) {
      return;
    }

    const data = ctx.body.data[0];

    if (_.has(data, 'dynamicZone')) {
      const transformedDZ = await transformDynamicZone(
        data.dynamicZone,
        strapi,
      );

      ctx.body.data[0] = { ...data, dynamicZone: transformedDZ };
    }
  };
};
