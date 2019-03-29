const influenceName = {
  F: 'Fire (red)',
  T: 'Time (yellow)',
  J: 'Justice (green)',
  P: 'Primal (blue)',
  S: 'Shadow (purple)',
  '': 'Faction none',
};

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

function isInfluenceStranger({ unitType = [], cardText }) {
  return unitType.includes('Stranger') && /gain {.}/.test(cardText);
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

  if (isFixing(card)) return 'fixing';
  if (isSingleInfluenceType(influences)) return influenceName[influences[0]];

  return 'multi';
}

module.exports = { getGroup, isInfluenceStranger };
