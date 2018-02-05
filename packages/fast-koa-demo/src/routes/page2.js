const Router = require('koa-router');
const config = require('../config');

const router = new Router({
  prefix: `${config.apiPrefix}`
});

router.get('/', ctx => {
  ctx.body = 'ok2, high priority.';
});

module.exports = {
  priority: 1,
  router
};
