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

async function getRatings() {
  const cells = await getCells(ratingsSpreadsheetId);
  return cells.reduce((acc, cell) => {
    const { row, col, value } = cell;
    const rating = ratingsByColumn[col];

    if (row <= headerRow) return acc;
    if (!rating && rating !== 0) return acc;

    return { ...acc, [sanitizeName(value)]: rating };
  }, {});
}

async function rateCards(cards) {
  const ratings = await getRatings();
  return cards.map(card => {
    let { name } = card;
    const { setNumber } = card;

    if (isInfluenceStranger(card)) name = INFLUENCE_STRANGER_NAME;
    if (name.endsWith('Banner')) name = ALL_BANNER_NAME;

    const rating = ratings[name];
    const foundRating = !!rating || rating === 0;
    const isCampaignSet = setNumber > 1000;

    if (isCampaignSet) console.error('No ratings for campaign sets');
    if (!foundRating && !isCampaignSet) {
      console.error('Could not rate card!', card);
    }

    return { ...card, rating: foundRating ? rating : -1 };
  });
}

module.exports = { rateCards };
