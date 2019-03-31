const rp = require('request-promise');
const { keysToCamel } = require('../utils/strings');
const { eternalCardsUrl } = require('../config');

async function getAllCards() {
  const str = await rp(eternalCardsUrl);
  return JSON.parse(str);
}

class API {
  constructor() {
    this.allCards = getAllCards();
  }

  async getCardDetails(name) {
    const cards = await this.allCards;
    const details = cards.find(({ Name }) => Name === name);
    if (!details) throw new Error(`Card details not found! ${name}`);
    return keysToCamel(details);
  }
}

module.exports = { getAllCards, API };
