import { validateInput } from "../utils/helpers.js";
import { Response } from '../utils/index.js';

export default class ValidationMiddleware {

  /**
   * Validates the request body against the provided schema.
   * If validation passes, proceeds to the next middleware.
   * Otherwise, sends a 400 error response with validation error details.
   * 
   * @param {Joi} schema - The validation schema to check the request body against.
   * @returns {function} Middleware function for validation.
   */
  static validate(schema) {
    return async (req, res, next) => {
      try {
        await validateInput(schema, req.body);
        next();
      } catch (error) {
        return Response.error(res, error.details[0].message, 400);
      }
    };
  }
}
