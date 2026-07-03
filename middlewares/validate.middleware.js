import { BadRequestError } from "../errors.js";

export const validate = (schemas = {}) => {
  return (req, res, next) => {
    if (!req.body) {
      throw BadRequestError("No body found");
    }
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }

    if (schemas.params) {
      req.params = schemas.params.parse(req.params);
    }

    next();
  };
};
