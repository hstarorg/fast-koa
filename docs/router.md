# Router

为了能够让路由被自动加载，我们需要符合以下约定：

1.  路由文件在路由目录中平级存放
2.  必须导出 `{ router }` 对象，该 `router` 为 `koa-router` 实例

## 一个简单的路由文件示例

```js
const Router = require('koa-router');
const config = require('../config');

const router = new Router({
  prefix: `${config.apiPrefix}/account`
});

// router.post('/token');

module.exports = {
  router
};
```

## 路由优先级

由于路由在目录中平级存放，如果我们要指定路由的优先级，可以采取如下写法：

```js
module.exports = {
  router,
  priority: 1000 // 默认值为0，值越大，越先加载
};
```
