const fs = require('fs');
const path = require('path');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const cors = require('koa-cors');
const responseTime = require('koa-response-time');
const body = require('koa-body');

/**
 * Dynamic load routes from routesPath folder.
 * @param {string} routesPath
 */
const loadRoutes = (app, routesPath) => {
  const routerArr = [];
  fs.readdirSync(routesPath).forEach(filename => {
    const routeFilePath = path.join(routesPath, filename);
    if (fs.statSync(routeFilePath).isFile() && path.extname(routeFilePath) === '.js') {
      const routeObj = require(routeFilePath);
      routerArr.push(routeObj);
    }
  });
  // Sort
  routerArr.sort((r1, r2) => (r2.priority || 0) - (r1.priority || 0));
  // Register routes
  routerArr.forEach(routeObj => {
    const router = routeObj.router;
    app.use(router.routes());
  });
};

/**
 * Load the preset middlewares.
 * @param {Koa.Application} app
 * @param {object} options
 */
const loadMiddleware = (app, options) => {
  if (options.enableLogger) {
    app.use(logger());
  }
  if (options.enableResponseTime) {
    app.use(responseTime());
  }
  if (options.enableHelmet) {
    app.use(helmet(options.helmetOptions || {}));
  }
  if (options.enableCors) {
    app.use(cors(options.corsOptions || {}));
  }
  app.use(body(options.bodyOptions || {}));
};

/**
 * Validate the user options
 * @param {object} options The options object
 * @returns {object} The processed options.
 */
const validOptions = options => {
  if (!options) {
    throw new Error('Must provide init options.');
  }
  if (!options.routesPath) {
    throw new Error('Must provide the routesPath option');
  }
};

const isFunction = fn => typeof fn === 'function';

module.exports = { validOptions, loadMiddleware, loadRoutes, isFunction };
