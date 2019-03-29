const { createElement } = require('react');
const blessed = require('blessed');
const { render } = require('react-blessed');
const { groupBy, range } = require('lodash');
const { getCards } = require('./utils/draft_spreadsheet');
const { rateCards } = require('./utils/card_ratings');
const { getGroup } = require('./utils/card_groups');
const App = require('./views/app.jsx').default;

async function run() {
  try {
    const cards = await getCards();
    const rated = await rateCards(cards);

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
      title: 'react-blessed hello world',
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
