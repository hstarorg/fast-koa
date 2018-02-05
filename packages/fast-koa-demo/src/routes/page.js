const Router = require('koa-router');
const config = require('../config');

const router = new Router({
  prefix: `${config.apiPrefix}`
});

router.get('/', ctx => {
  ctx.body = 'ok';
});

module.exports = {
  priority: 0,
  router
};
