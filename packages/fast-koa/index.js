const Koa = require('koa');
const http = require('http');

const util = require('./lib/util');
const validator = require('./lib/validator');
const DBProviders = require('./lib/db-providers');

let app;

/**
 * Init the koa app.
 * @param {object} options The options object
 * @param {string} options.routesPath The routes folder path
 * @param {bool} options.enableHelmet Enable the helmet support
 * @param {object} options.helmetOptions The koa-helmet options
 * @param {bool} options.enableResponseTime Enable the responseTime support
 * @param {bool} options.enableLogger Enable the logger support
 * @param {bool} options.enableCors Enable the cors support
 * @param {object} options.corsOptions The koa-cors options
 * @param {object} options.bodyOptions The koa-body options
 * @param {function} options.onRoutesLoading The callback will be fire before routes loading
 * @param {function} options.onRoutesLoaded The callback will be fire after routes loaded
 */
const initApp = options => {
  app = new Koa();
  util.validOptions(options);
  util.loadMiddleware(app, options);
  if (util.isFunction(options.onRoutesLoading)) {
    options.onRoutesLoading.call(null, app, options);
  }
  util.loadRoutes(app, options.routesPath);
  if (util.isFunction(options.onRoutesLoaded)) {
    options.onRoutesLoaded.call(null, app, options);
  }
  return app;
};

/**
 * Fast listen a port
 * @param {number} port
 */
const listen = port => {
  if (!app) {
    return console.error('Please initApp before listen port.');
  }
  const server = http.createServer(app.callback());
  return new Promise((resolve, reject) => {
    server.listen(port, err => {
      if (err) {
        return reject(err);
      }
      resolve(server);
    });
  });
};

module.exports = {
  initApp,
  listen,

  validator,
  DBProviders
};
