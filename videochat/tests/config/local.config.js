const unitConfig = require('./jest.config');
const integrationConfig = require('./integration.config');

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
  }
 ]
};