# Best Practices

## 目录结构

推荐采用如下目录结构：

```bash
src/ # 项目根目录
  bizs/ # 业务逻辑目录，类似于Java的Business，C#的BLL层
    schemas/ # 存储请求数据验证Schema，Joi Schema
    sqlstore/ # 存储数据语句
    xxxBiz.js # 针对xxx路由的逻辑层代码
  common/ # 公共依赖目录
    util.js
    db.js
    index.js # 所有common对象，都建议统一导出
  routes/ # 放置所有的路由
    xxx.js
  config.js # 系统统一配置文件
  index.js # (入口文件，名称也必须是这个，否则无法被fast-koa-cli识别)
```

## 数据库访问层

由于数据库访问是需要一些的配置文件，也有不同的访问。为了简化调用，我们一帮推荐在 `common/` 中，实现一个 `db.js` 来提供通用数据库访问。

一个简单的示例如下：

```js
// common/db.js
const mysql = require('mysql'); // 手动引入mysql
const { DBProviders: { MysqlClient } } = require('fast-koa'); // 导入MysqlClient
const config = require('../config');

const pool = mysql.createPool(config.dbConfig); // 利用 mysql 创建连接池

module.exports = new MysqlClient(pool); // 统一导出
```
