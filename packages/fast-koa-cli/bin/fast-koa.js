#!/usr/bin/env node

const program = require('commander');
const packageJson = require('../package.json');
const version = `fast-koa-cli: ${packageJson.version}`;

program.version(version).usage('fast-koa-cli');

// Run dev
program
  .command('dev')
  .description('Run dev with watch')
  .action(() => {
    require('../lib/gulp-dev')();
  });

// Run build
program
  .command('build')
  .description('Run build and install production deps')
  .action(() => {
    require('../lib/gulp-build')();
  });

// 解析命令
program.parse(process.argv);

// 如果直接使用fast-koa，那么显示help
if (process.argv.length === 2) {
  program.outputHelp();
}
