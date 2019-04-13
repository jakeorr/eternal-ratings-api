/**
 * eternal-ratings-api
 */
// run `yarn fetch` to rebuild rated_cards.json
const ratedCards = require('./rated_cards.json');
const { groupCards } = require('./utils/card_groups');
const { parseCardExport } = require('./utils/strings');

function rateCard(card) {
  const cardWithRating = ratedCards.find(({ name }) => name === card.name);
  return { ...cardWithRating, ...card };
}

/**
 * Accepts an array of cards with `name` and optionally `count`.
 *
 * You can get cards in this format using `parseCardExport` to process
 * lines from an eternal export.
 */
function rateCards(cards) {
  return cards.map(rateCard);
}

module.exports = {
  rateCards,
  rateCard,
  ratedCards,
  groupCards,
  parseCardExport,
};
