import { STATUS_CODE } from "./constants.js";

export class BaseError extends Error {
  status = 500;
  constructor(message, options) {
    super(message, options);
    this.status = options.status;
  }
}

export function NotFoundError(message, options = {}) {
  return new BaseError(message, {
    ...options,
    status: STATUS_CODE.NOTFOUND,
  });
}
export function UnauthourizedError(message, options = {}) {
  return new BaseError(message, {
    ...options,
    status: STATUS_CODE.UNAUTHOURIZED,
  });
}
export function UnAuthenticatedError(message, options = {}) {
  return new BaseError(message, {
    ...options,
    status: STATUS_CODE.FORBIDDEN,
  });
}
export function BadRequestError(message, options = {}) {
  return new BaseError(message, {
    ...options,
    status: STATUS_CODE.BAD_REQUEST,
  });
}
