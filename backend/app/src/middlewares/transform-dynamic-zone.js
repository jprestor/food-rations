"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const fetchWidgetActions = async (actions, strapi) => {
    if (!actions) {
        return {};
    }
    try {
        const promises = actions.map((action) => {
            const { apiName, filters, populate, limit, sort } = action;
            return strapi.entityService.findMany(`api::${apiName}.${apiName}`, {
                populate,
                filters,
                limit,
                sort,
            });
        });
        const resolved = await Promise.all(promises);
        return resolved.reduce((acc, data, index) => {
            return Object.assign(Object.assign({}, acc), { [actions[index].fieldName]: data });
        }, {});
    }
    catch (error) {
        console.log('Error in fetchWidgetActions', error);
        return {};
    }
};
const transformDynamicZone = async (data, strapi) => {
    const result = data.reduce(async (acc, item) => {
        if (item.__component === 'widgets.widget') {
            const { widget } = item;
            const dataFromActions = await fetchWidgetActions(widget.actions, strapi);
            const widgetData = Object.assign(Object.assign({ componentName: widget.componentName, files: widget.files }, widget.data), dataFromActions);
            return [...(await acc), widgetData];
        }
        const componentName = item.__component.split('.')[1];
        const camel = componentName
            .split('-')
            .map((word) => lodash_1.default.capitalize(word))
            .join('');
        return [...(await acc), Object.assign(Object.assign({}, item), { componentName: camel })];
    }, Promise.resolve([]));
    return result;
};
exports.default = (config, { strapi }) => {
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
        if (lodash_1.default.has(data, 'dynamicZone')) {
            const transformedDZ = await transformDynamicZone(data.dynamicZone, strapi);
            ctx.body.data[0] = Object.assign(Object.assign({}, data), { dynamicZone: transformedDZ });
        }
    };
};
//# sourceMappingURL=transform-dynamic-zone.js.map