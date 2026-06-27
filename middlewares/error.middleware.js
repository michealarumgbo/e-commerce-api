import z, { ZodError } from "zod";
import { BaseError } from "../errors.js";
import { STATUS_CODE } from "../constants.js";
import jwt from "jsonwebtoken";

export default async function errorMiddleware(err, req, res, next) {
  const errMsg = err.message;
  const status = err.status;

  if (err instanceof BaseError) {
    res.status(status).json({ error: errMsg });
  } else if (err instanceof ZodError) {
    const errors = z.flattenError(err);
    let error =
      errors.formErrors.length != 0 ? errors.formErrors : errors.fieldErrors;

    error = Object.values(error)
      .map((e) => e[0])
      .join(", ");

    res.status(STATUS_CODE.BAD_REQUEST).json({ error });
  } else if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return res.status(STATUS_CODE.UNAUTHOURIZED).json({
      error: "Invalid or expired token",
    });
  } else {
    console.log(errMsg);
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
  await next();
}
