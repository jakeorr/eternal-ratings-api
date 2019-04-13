const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const { parseCardExport } = require('../utils/strings');

async function getCards() {
  const data = fs.readFileSync(
    path.join(__dirname, '..', 'PASTE_CARDS_HERE.txt'),
    'utf8'
  );

  return Promise.map(data.split('\n').filter(el => !!el), line => {
    const { count, name } = parseCardExport(line.trim());
    return { name, count: parseInt(count, 10) };
  });
}

module.exports = { getCards };
