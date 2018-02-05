const path = require('path');
const shelljs = require('shelljs');

module.exports = function() {
  const gulpfilePath = path.join(__dirname, 'gulpfile.js');
  const cwd = process.cwd();

  shelljs.exec(`gulp dev --gulpfile ${gulpfilePath} --cwd ${cwd} --color`);
};
