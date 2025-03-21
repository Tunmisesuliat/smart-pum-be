import express from 'express';
import 'dotenv/config';
import expressConfig from './config/express.js';

const port = process.env.APP_PORT || 8080;
const app = express();
expressConfig(app);

app.listen(port);
logger.info(`Application started on port ${port}`);

export default app;