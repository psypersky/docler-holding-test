
/**
 * Read .env file and put it in process.env
 * If .env does not exists, `.env.default` will be used instead.
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const debug = require('debug')('app:loadenv');

try {
  fs.statSync('.env');
  debug('Loading env config');
  dotenv.load({ path: path.resolve('.env') });
} catch (e) {}

dotenv.load({ path: path.resolve('.env.default') });
