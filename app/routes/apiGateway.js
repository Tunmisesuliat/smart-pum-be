import express from 'express';
import { Response } from '../utils/index.js';
import UserRouter from '../modules/user/user.router.js';

const router = express.Router();

router.use('/user', UserRouter);

router.get('/', (req, res) => Response.info(res, 'Hello World', 200));
router.get('/healthcheck/ping', (req, res) => Response.info(res, 'PONG', 200));

router.use('*', (req, res) => Response.error(res, 'The resource you are looking for was not found', 404));
export default router;