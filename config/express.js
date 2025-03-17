import fs from 'fs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import FileStreamRotator from 'file-stream-rotator';
import 'express-async-errors';
import loggerInit from '../config/logger.js';
import routes from '../app/routes/apiGateway.js';
import errorHandler from './errorHandler.js';

const logDirectory = './log';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

/**
 * Configure Express application.
 *
 * @param {Express} app - Express application to configure
 *
 * @example
 * const express = require('express');
 * const app = express();
 * require('./config/express')(app);
 *
 * @module config/express
 */
const expressConfig = (app) => {
    let accessLogStream;
    let logger;

    // initialize logger
    if (app.get('env') === 'development') logger = loggerInit('development');
    else if (app.get('env') === 'production') logger = loggerInit('production');
    else if (app.get('env') === 'test') logger = loggerInit('test');
    else logger = loggerInit();

    global.logger = logger;
    logger.info('Application starting...');
    logger.debug("Overriding 'Express' logger");

    if (checkLogDir) {
        accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: `${logDirectory}/access-%DATE%.log`,
            frequency: 'weekly',
            verbose: false,
        });
    }

    app.use(morgan('combined', { stream: accessLogStream }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Use helmet to secure Express headers
    app.use(helmet());
    app.disable('x-powered-by');

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
        res.sendStatus(200); // Respond with OK
      });

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use('/v1/', routes);
    app.use(errorHandler);

    app.use((req, res, next) => {
        res.status(404).json({
            status: 'error',
            message: 'Route not found',
            method: req.method,
            path: req.originalUrl
        });
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development' || app.get('env') === 'test') {
        app.use((err, req, res, next) => {
            res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Internal Server Error',
                stack: app.get('env') === 'development' ? err.stack : undefined
            });
        });
    }

    // production error handler
    // remove stacktrace
    app.use((err, req, res) => res.status(err.status || 500).json({ message: err.message }));
};

export default expressConfig;
