const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const { groupBy, range } = require('lodash');
const ora = require('ora');
const { rateCards } = require('./utils/card_ratings');
const { getGroup } = require('./utils/card_groups');
const { getCards } = require('./lib/cards_file');
const { renderToConsole } = require('./lib/terminal');
const sample = require('./sample.json');

async function run() {
  try {
    let cards;
    let rated;
    const cardsSpinner = ora('Fetching cards');
    const ratingSpinner = ora('Rating cards');

    try {
      cardsSpinner.start();
      cards = await getCards();
      cardsSpinner.succeed();
    } catch (err) {
      cardsSpinner.fail();
      throw err;
    }

    try {
      ratingSpinner.start();
      rated = await rateCards(cards);
      ratingSpinner.succeed();
    } catch (err) {
      ratingSpinner.fail();
      throw err;
    }

    // delay so spinner success has a chance to render
    await Promise.delay(500);

    const grouped = groupBy(rated, getGroup);

    const emptyCounts = range(5, -0.5, -0.5).reduce(
      (acc, rating) => ({
        ...acc,
        [rating.toFixed(1)]: 0,
      }),
      {}
    );
    const groups = Object.keys(grouped).map(name => {
      const groupCards = grouped[name];
      const counts = groupCards.reduce(
        (inner, card) => ({
          ...inner,
          [card.rating.toFixed(1)]: inner[card.rating.toFixed(1)] + 1,
        }),
        emptyCounts
      );
      return { name, counts, cards: groupCards };
    }, {});

    // TODO: temp
    // return fs.writeFile(
    //   path.join(__dirname, 'sample.json'),
    //   JSON.stringify(groups, null, 2),
    //   err => console.log('done', err)
    // );

    renderToConsole(groups);
  } catch (err) {
    console.error(err);
  }
}

run();
// renderToConsole(sample);
