const rp = require('request-promise');
const { eternalCardsUrl } = require('../config');

async function getAllCards() {
  const str = await rp(eternalCardsUrl);
  return JSON.parse(str);
}

module.exports = { getAllCards };
