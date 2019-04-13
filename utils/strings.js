const camelcase = require('camelcase');

function keysToCamel(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [camelcase(key)]: obj[key] };
  }, {});
}

function sanitizeName(name) {
  return name.replace('’', "'").trim();
}

/**
 * Parses a line from a card export.
 *
 * "1 Helpful Doorbot (Set3 #2)"
 * becomes
 * { name: "Helpful Doorbot", count: 1 }
 */
function parseCardExport(str) {
  const re = /(\d\d*)\s(.+)\(Set.+\)/i;
  // eslint-disable-next-line no-unused-vars
  const [line, count, name] = re.exec(str);
  return { name: sanitizeName(name), count };
}

module.exports = { keysToCamel, parseCardExport, sanitizeName };
