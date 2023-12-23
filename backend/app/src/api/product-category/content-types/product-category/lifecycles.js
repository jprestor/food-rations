"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
module.exports = {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.name && !data.slug) {
            data.slug = (0, slugify_1.default)(data.name, { lower: true });
        }
    },
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.name && !data.slug) {
            data.slug = (0, slugify_1.default)(data.name, { lower: true });
        }
    },
};
//# sourceMappingURL=lifecycles.js.map