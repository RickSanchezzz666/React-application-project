const unitConfig = require('./jest.config');
const integrationConfig = require('./integration.config');
const e2eConfig = require('./e2e.config');

const rootDir = './src';

module.exports = {
 projects: [
  {
   ...unitConfig,
   rootDir,
  },
  {
   ...integrationConfig,
   rootDir,
  },
  {
    ...e2eConfig,
    rootDir: './tests'
  }
 ]
};