const { getCells } = require('../lib/google_docs');
const { isInfluenceStranger } = require('./card_groups');
const { sanitizeName } = require('./strings');
const { ratingsSpreadsheetId } = require('../config');

const headerRow = 2;
const ratingsByColumn = {
  1: 5,
  3: 4.5,
  5: 4,
  7: 3.5,
  9: 3,
  11: 2.5,
  13: 2,
  15: 1.5,
  17: 1,
  19: 0.5,
  21: 0,
};
const INFLUENCE_STRANGER_NAME = 'All Influence Strangers';
const ALL_BANNER_NAME = 'All Banners';
const ALL_CRESTS_NAME = 'Crests';

async function getRatings() {
  const cells = await getCells(ratingsSpreadsheetId);
  return cells.reduce((acc, cell) => {
    const { row, col, value } = cell;
    const rating = ratingsByColumn[col];

    if (row <= headerRow) return acc;
    if (!rating && rating !== 0) return acc;

    return { ...acc, [sanitizeName(value).toLowerCase()]: rating };
  }, {});
}

async function rateCards(cards) {
  const ratings = await getRatings();
  return cards.map(card => {
    let { name } = card;
    const { setNumber, rarity, deckBuildable, type } = card;

    if (isInfluenceStranger(card)) name = INFLUENCE_STRANGER_NAME;
    if (name.endsWith('Banner')) name = ALL_BANNER_NAME;
    if (name.startsWith('Crest')) name = ALL_CRESTS_NAME;

    const rating = ratings[name.toLowerCase()];
    const foundRating = !!rating || rating === 0;
    const isSigil = name.endsWith('Sigil') && type === 'Power';

    const shouldSkip =
      // No ratings for campaign sets
      setNumber > 1000 ||
      // No ratings for promo cards
      rarity === 'Promo' ||
      // Non-deckBuildable includes cards that are created by other cards, possible other things...
      !deckBuildable ||
      isSigil ||
      // No ratings for set 0
      setNumber === 0;

    if (!foundRating && !shouldSkip) {
      console.error('Could not rate card!', card);
    }

    return { ...card, rating: foundRating ? rating : -1 };
  });
}

module.exports = { rateCards };
