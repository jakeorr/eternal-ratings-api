const { getCardDetails } = require('./eternal_warcry');
const { getCells } = require('./google_docs');
const { parseCardName } = require('../utils/strings');
const { draftsSpreadsheetId } = require('../config');

async function getCards() {
  const cells = await getCells(draftsSpreadsheetId);

  return cells.map(cell => {
    const { value } = cell;
    const { count, name } = parseCardName(value);
    const details = getCardDetails(name.trim());
    return { ...details, count: parseInt(count, 10) };
  });
}

module.exports = { getCards };
