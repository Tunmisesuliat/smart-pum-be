import { Response } from "../app/utils/index.js";

/**
 * @description
 * This middleware catches all thrown errors in the application,
 * logs the error to the console and sends a json response with
 * a corresponding status code.
 * @param {Object} error - The thrown error
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}
 */
export default function errorHandler(error, req, res, next) {
  if (!res || typeof res.status !== 'function') {
    return next(error); // Ensure Express continues processing
  }

  let code = error.statusCode || 500;
  let message;
  if (error.message == 'jwt malformed') {
    message = 'Invalid or expired token';
    code = 401;
  }

  if (error.message === 'jwt expired' || error.message === 'invalid signature') {
    message = 'Session expired. Kindly login to continue.';
    code = 401;
  } else {
    message = error.message
  }

  logger.error(error.message);

  return Response.error(res, message, code);
};
