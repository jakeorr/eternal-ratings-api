const { getAllCards } = require('../lib/eternal_warcry');
const { getCells } = require('../lib/google_docs');
const { keysToCamel } = require('./strings');
const { draftsSpreadsheetId } = require('../config');

async function getCards() {
  const cells = await getCells(draftsSpreadsheetId);
  const allCards = await getAllCards();

  return cells.map(cell => {
    const { value } = cell;
    const re = /(\d\d*)\s(.+)\(Set.+\)/i;
    const [line, count, name] = re.exec(value);
    const cardDetails = allCards.find(({ Name }) => Name === name.trim());

    if (!cardDetails) console.error('Card details not found!', line);

    return { ...keysToCamel(cardDetails), count: parseInt(count, 10) };
  });
}

module.exports = { getCards };
