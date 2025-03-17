import joi from 'joi';

/**
 * contains validation helpers
 *
 * @class ValidationHelper
 */
class ValidationHelper {
  /**
   * It validates an optional string.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static optionalStringCheck(param, min = 1, max = 12000000) {
    return joi.string().trim().min(min).max(max)
      .optional()
      .messages({
        'any.required': `${param} is a required field`,
        'string.max': `${param} can not be greater than ${max} characters`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.base': `${param} must be a string`,
        'string.empty': `${param} cannot be an empty field`,
      });
  }

  /**
   * It validates a phone number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static optionalPhoneNumberCheck() {
    return joi.string()
      .pattern(new RegExp(/^\+?[\d\s()\-]*$/))
      .optional()
      // .max().trim() 
      .messages({
        'string.pattern.base': 'Phone Number must be in international format, e.g., +1, +44...',
        'string.empty': 'Phone Number must not be an empty field',
        'string.max': 'Phone Number must not exceed 14 digits',
        'any.required': 'Phone Number is a required field',
      });
  }

  /**
   * It validates a email
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static emailCheck() {
    return joi.string().trim().email().lowercase()
      .required()
      .messages({
        'any.required': 'Email is a required field',
        'string.email': 'Email is not valid',
        'string.empty': 'Email cannot be an empty field'
      });
  }

  /**
   * It validates an optional email.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static optionalEmailCheck() {
    return joi.string().trim().email().lowercase()
      .optional()
      .messages({
        'any.required': 'Email is a required field',
        'string.email': 'Email is not valid',
        'string.empty': 'Email cannot be an empty field'
      });
  }

  /**
   * It validates a password.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static passwordCheck() {
    return joi.string().trim().required().min(7)
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password field cannot be an empty field',
        'any.required': 'Password field is required',
        'string.min': 'Password can not be lesser than 7 characters'
      });
  }
}

export default ValidationHelper;
