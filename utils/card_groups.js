const { groupBy, range } = require('lodash');
const { group, NO_RATING_GROUP, FOUR_PLUS_GROUP } = require('../config');

function isSingleInfluenceType(influences) {
  const result = influences.reduce(
    ({ cur, isSingle }, influence) => {
      const isMatch = cur === influence;
      return { cur: influence, isSingle: isSingle && isMatch };
    },
    { cur: influences[0], isSingle: true }
  );

  return result.isSingle;
}

function isInfluenceStranger({ unitType = [], cardText, name }) {
  return unitType.includes('Stranger') && /gain {.}/i.test(cardText);
}

function isFixing(card) {
  const { type, name } = card;

  // Power cards
  if (type === 'Power') return true;

  // Stranger that gain influence
  if (isInfluenceStranger(card)) return true;

  // Cargo cards
  if (name.includes('Cargo')) return true;

  // TODO: this could be smarter
  // - amber acolyte, lost scroll, other cards...
  // TODO: could we generalize this more? (any cards that "gain {.}")
  // - any cards that draw sigils

  return false;
}

/**
 * Groups can be and influence type (eg. "F"), "multi",
 * or "fixing"
 */
function getGroup(card) {
  const { influence } = card;

  const influences = influence.split('}{').map(el => el.replace(/[{}]/g, ''));

  if (isFixing(card)) return group.FIXING;
  if (isSingleInfluenceType(influences)) return influences[0];

  return group.MULTI;
}

function groupCards(ratedCards) {
  const grouped = groupBy(ratedCards, getGroup);

  const emptyCounts = range(5, -0.5, -0.5).reduce(
    (acc, rating) => ({
      ...acc,
      [rating.toFixed(1)]: 0,
    }),
    { NO_RATING_GROUP: 0, FOUR_PLUS_GROUP: 0 }
  );

  return Object.keys(grouped).map(name => {
    const cards = grouped[name];
    const counts = cards.reduce((inner, { rating }) => {
      return {
        ...inner,
        [rating.toFixed(1)]: inner[rating.toFixed(1)] + 1,
        [FOUR_PLUS_GROUP]:
          rating >= 4 ? inner[FOUR_PLUS_GROUP] + 1 : inner[FOUR_PLUS_GROUP],
      };
    }, emptyCounts);
    return { name, counts, cards };
  }, {});
}

module.exports = { groupCards, getGroup, isInfluenceStranger };
