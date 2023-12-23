"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIRM_RETURN_URL = exports.PaymentStatuses = void 0;
var PaymentStatuses;
(function (PaymentStatuses) {
    PaymentStatuses[PaymentStatuses["Unpaid"] = 1] = "Unpaid";
    PaymentStatuses[PaymentStatuses["Paid"] = 2] = "Paid";
    PaymentStatuses[PaymentStatuses["Cancelled"] = 3] = "Cancelled";
})(PaymentStatuses || (exports.PaymentStatuses = PaymentStatuses = {}));
exports.CONFIRM_RETURN_URL = 'https://takietesti.ru';
//# sourceMappingURL=index.js.map