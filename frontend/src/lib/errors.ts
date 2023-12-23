export class ApiError extends Error {
  constructor(
    funcName: string,
    public info: any,
    public status: number,
  ) {
    super(`Error in ${funcName}`);
    this.info = info;
    this.status = status;
  }
}

export type ApiErrorType = typeof ApiError;
