import status from 'http-status';

/**
 * Sends a JSON response with a success status.
 *
 * @param {Object} res - The response object.
 * @param {string} message - The message to include in the response.
 * @param {number} code - The HTTP status code.
 * @param {Array} [data=[]] - Optional data to include in the response.
 */
export const info = (res, message, code, data = []) => res.status(code).json({
  status: 'success',
  message,
  data,
});

/**
 * Sends a JSON response with an error status.
 *
 * @param {Object} res - The response object.
 * @param {string} [message=''] - The error message to include in the response.
 *   If not provided, the HTTP status name associated with the specified code
 *   will be used.
 * @param {number} [code=500] - The HTTP status code.
 */
export const error = (res, message = '', code = 500) => res.status(code).json({
  status: 'error',
  message: message || status[`${code}_NAME`],
});
