# Options

在 `initApp` 时，我们需要传递一个 `options` 对象，由它来控制我们 app 集成的功能点。这个 `options` 的结构如下：

```js
{
  routesPath: string, // 必选项，fast-koa由此确定从哪个目录加载路由（注意所有路由必须平级放在该目录下，不支持子目录）
  enableHelmet: bool, // 是否引入koa-helmet中间件，该中间件主要用于设置安全header，中间件地址：https://github.com/venables/koa-helmet
  helmetOptions: object, // koa-helmet的配置项，参考：https://helmetjs.github.io/docs/
  enableResponseTime: bool, // 是否引入koa-response-time中间件，该中间件主要用于在header中返回本次api的处理时间，中间件地址：https://github.com/koajs/response-time
  enableLogger: bool, // 是否引入koa-logger中间件，该中间件用于在控制台打印请求信息，github地址：https://github.com/koajs/logger
  enableCors: bool, // 是否引入koa-cors中间件，主要利用CORS允许跨域请求，github地址：https://github.com/evert0n/koa-cors
  corsOptions: object, // koa-cors中间件的配置项，参考：https://github.com/evert0n/koa-cors
  bodyOptions: object, // koa-body中间件的配置项，参考：https://github.com/dlau/koa-body
  onRoutesLoading: function, // 在路由加载前，注入自己的逻辑代码，传递给该函数的参数为 (app, options)
  onRoutesLoaded: function // 在路由加载后，注入自己的逻辑代码，传递给该函数的参数为 (app, options)
}
```

``注：koa-body已经集成了formdata解析，如果要处理上传文件，只需要设置bodyOptions={multipart: true}即可，当然文件大小这类限制，请配置相关参数限定``
