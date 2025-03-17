import Joi from 'joi';
import { ValidationHelper } from '../../utils/index.js';

export const loginSchema = Joi.object({
    email: ValidationHelper.emailCheck(),
    password: ValidationHelper.passwordCheck()
});

export const updateUserSchema = Joi.object({
    email: ValidationHelper.optionalEmailCheck(),
    firstName: ValidationHelper.optionalStringCheck(),
    lastName: ValidationHelper.optionalStringCheck(),
    company: ValidationHelper.optionalStringCheck(),
    address: ValidationHelper.optionalStringCheck(),
    phone: ValidationHelper.optionalPhoneNumberCheck(),
});
