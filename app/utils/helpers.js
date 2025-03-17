import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * validates an input based on a schema
 * @static
 * @param { Joi } schema - The validation schema.
 * @param { Object } object - The data to be validated
 * @memberof Helper
 * @returns { boolean }
*/
export const validateInput = async (schema, object) => schema.validateAsync(object);

/**
 * This checks if a plain text matches a certain hash value by generating
 * @param {string} plainPassword - plain text to be used in the comparison.
 * @param {string} hashedPassword - hashed value created with the salt.
 * @memberof Helper
 * @returns {boolean} - returns a true or false, depending on the outcome of the comparison.
 */
export const comparePassword = (plainPassword, hashedPassword) => {
  const result = bcrypt.compareSync(plainPassword, hashedPassword);
  return result;
};

/**
 * This is used for generating a hash and a salt from a String.
 * @param {string} password - String to be encrypted.
 * @memberof Helper
 * @returns {Object} - An object containing the hash and salt of a String.
*/
export const hashPassword = (password) => bcrypt.hash(password, 10);

/**
   * generate JWT token
   * @static
   * @memberof Helper
   * @returns {String}
   */
// eslint-disable-next-line max-len
export const generateAuthToken = async (data) => jwt.sign(data, process.env.APP_JWT_SECRET, {
  expiresIn: '1d',
});

/**
 * This verify the JWT token with the secret with which the token was issued with
 * @param {string} token - JWT Token
 * @memberof AuthHelper
 * @returns {string | number | Buffer | object } - Decoded JWT payload if
 * token is valid or an error message if otherwise.
 */
export const verifyToken = (token) => jwt.verify(token, process.env.APP_JWT_SECRET);
