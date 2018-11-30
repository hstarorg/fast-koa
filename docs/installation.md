# 如何安装 fast-koa

`fast-koa` 是一个 npm 包，所以安装 npm 包的安装方式安装即可，如下：

```bash
npm i fast-koa -S
```

该包同时依赖了如下 npm 包：

```
"joi" // 对象验证
"koa" // koa核心包
"koa-body" // 解析request body参数
"@koa/cors" // 处理跨域
"koa-helmet" // 设置安全header
"koa-logger" // 日志记录
"koa-response-time" // 响应时间记录
"koa-router" // 路由
```

所以以上这些包也可以在项目中直接使用。

# 如何安装 fast-koa-cli

仅仅是 `fast-koa` 还不够，通过 `fast-koa-cli` 能够更高效的专注于功能实现。它的主要功能就是提供基本的构建模型。当然，你也可以自行实现构建。

为了和项目放在一起，建议使用本地安装方式。如下：

```bash
npm i fast-koa-cli -D
```

之后在 `package.json` 中添加 `fast-koa-cli` 的命令即可完成安装。命令在 `package.json` 中如下：

```
// package.json
{
  ...
  "scripts": {
    "dev": "fast-koa dev",
    "build": "fast-koa build"
  }
  ...
}
```

之后，通过执行对应的 `npm scripts` 命令就可以进行开发和发布了。

```bash
# Run dev
npm run dev # 实际执行的是 fast-koa dev, 会自动监控src目录，并重启api server

# Run build
npm run build # 实际执行的是 fast-koa build, 将文件拷贝到dist目录，并使用 `npm i --production` 安装运行时依赖
``
```

**注意：fast-koa-cli 对目录有结构有要求，请参考 [fast-koa-demo](../packages/fast-koa-demo) 的目录结构。**
