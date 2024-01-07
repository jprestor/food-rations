export enum ExecutionStatuses {
  NEW = 1,
  COMPLETED,
  CANCELLED,
}

export enum PaymentStatuses {
  UNPAID = 1,
  PAID,
  CANCELLED,
}

export const CONFIRM_RETURN_URL =
  'https://xn----7sbhkold2df4gc.xn--p1ai/user/orders';
