import { Router } from 'express';
import UserController from './user.controller.js';
import { ValidationMiddleware, Auth } from '../../middlewares/index.js';
import * as Schema from './user.schema.js';

const { validate } = ValidationMiddleware;
const { isAuthenticated } = Auth;
const router = Router();

router.get('/profile', isAuthenticated, UserController.getUserdetails);
router.post('/login', validate(Schema.loginSchema), UserController.loginUser);

router.put('/', isAuthenticated, validate(Schema.updateUserSchema), UserController.updateUserDetails);

export default router;