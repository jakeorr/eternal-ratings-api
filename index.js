const { groupBy, range } = require('lodash');
const { getCards } = require('./utils/draft_spreadsheet');
const { rateCards } = require('./utils/card_ratings');
const { getGroup } = require('./utils/card_groups');

async function run() {
  try {
    const cards = await getCards();
    const rated = await rateCards(cards);

    const grouped = groupBy(rated, getGroup);

    // console.log('grouped', grouped);

    const emptyCounts = range(5, -0.5, -0.5).reduce(
      (acc, rating) => ({
        ...acc,
        [rating.toFixed(1)]: 0,
      }),
      {}
    );
    const groupCounts = Object.keys(grouped).reduce((acc, key) => {
      const counts = grouped[key].reduce(
        (inner, card) => ({
          ...inner,
          [card.rating]: inner[card.rating] + 1,
        }),
        emptyCounts
      );
      return { ...acc, [key]: counts };
    }, {});

    console.log(groupCounts);

    // TODO: count ratings

    // TODO: sort by cost

    // TODO: pull out power cards

    console.log('done');
  } catch (err) {
    console.error(err);
  }
}

run();
