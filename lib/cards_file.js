const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const { API } = require('./eternal_warcry');
const { parseCardName } = require('../utils/strings');

async function getCards() {
  const api = new API();
  const data = fs.readFileSync(
    path.join(__dirname, '..', 'PASTE_CARDS_HERE.txt'),
    'utf8'
  );

  return Promise.map(data.split('\n').filter(el => !!el), line => {
    const { count, name } = parseCardName(line.trim());
    return new Promise(async (resolve, reject) => {
      let details;

      try {
        details = await api.getCardDetails(name.trim());
      } catch (err) {
        reject(err);
      }

      resolve({ ...details, count: parseInt(count, 10) });
    });
  });
}

module.exports = { getCards };
