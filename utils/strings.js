const camelcase = require('camelcase');

function keysToCamel(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [camelcase(key)]: obj[key] };
  }, {});
}

module.exports = { keysToCamel };
