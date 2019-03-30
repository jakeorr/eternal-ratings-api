const Promise = require('bluebird');
const { createElement } = require('react');
const blessed = require('blessed');
const { render } = require('react-blessed');
const { groupBy, range } = require('lodash');
const ora = require('ora');
const { getCards } = require('./utils/draft_spreadsheet');
const { rateCards } = require('./utils/card_ratings');
const { getGroup } = require('./utils/card_groups');
const App = require('./views/app.jsx').default;

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
    const groupsWithCounts = Object.keys(grouped).reduce((acc, key) => {
      const groupCards = grouped[key];
      const counts = groupCards.reduce(
        (inner, card) => ({
          ...inner,
          [card.rating]: inner[card.rating] + 1,
        }),
        emptyCounts
      );
      return { ...acc, [key]: { counts, cards: groupCards } };
    }, {});

    // console.log(groupsWithCounts);

    // TODO: count ratings

    // TODO: sort by cost

    // Creating our screen
    const screen = blessed.screen({
      autoPadding: true,
      smartCSR: true,
      title: 'eternal-ratings',
    });

    // Adding a way to quit the program
    screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

    // Rendering the React app using our screen
    render(createElement(App, { groupsWithCounts }), screen);

    // console.log('done');
  } catch (err) {
    console.error(err);
  }
}

run();
