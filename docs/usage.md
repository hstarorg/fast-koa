# Usage

基本的使用方法，请参考：[https://github.com/hstarorg/fast-koa/tree/master/packages/fast-koa-demo](https://github.com/hstarorg/fast-koa/tree/master/packages/fast-koa-demo)

一般来说，只需要引入 `fast-koa`，提供初始化参数即可：

```js
const path = require('path');
const fastKoa = require('fast-koa');

fastKoa.initApp({ routesPath: path.join(__dirname, 'routes') });

fastKoa
  .listen(7777)
  .then(server => {
    const addr = server.address();
    console.log(`Server started. listen ${addr.port}`);
  })
  .catch(console.error);
```

其中 `listen` 方法的源代码如下：

```js
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
```

完全可以通过 `initApp` 返回的 `app` 实例自行启动，如下：

```js
const path = require('path');
const http = require('http);
const fastKoa = require('fast-koa');

const app = fastKoa.initApp({ routesPath: path.join(__dirname, 'routes') });

const server = http.createServer(app.callback());
server.listen(7777, err=>{});
```
