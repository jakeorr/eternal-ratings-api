const rp = require('request-promise');
const { keysToCamel } = require('../utils/strings');
const { eternalCardsUrl } = require('../config');

async function getAllCards() {
  const str = await rp(eternalCardsUrl);
  const cards = JSON.parse(str) || [];
  return cards.map(keysToCamel);
}

class API {
  constructor() {
    this.allCards = getAllCards();
  }

  async getCardDetails(name) {
    const cards = await this.allCards;
    const details = cards.find(card => card.name === name);
    if (!details) throw new Error(`Card details not found! ${name}`);
    return keysToCamel(details);
  }
}

module.exports = { getAllCards, API };
