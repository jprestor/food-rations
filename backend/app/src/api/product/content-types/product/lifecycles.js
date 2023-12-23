"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const generateSlug = (data) => {
    if (data.name && !data.slug) {
        data.slug = (0, slugify_1.default)(data.name, { lower: true });
    }
};
module.exports = {
    beforeCreate(event) {
        const { data } = event.params;
        generateSlug(data);
    },
    async beforeUpdate(event) {
        const { params: { data }, } = event;
        generateSlug(data);
    },
};
//# sourceMappingURL=lifecycles.js.map