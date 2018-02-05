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
