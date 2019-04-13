/**
 * Fetches card details from Eternal Warcry and card ratings from a Google Spreadsheet.
 * Rates each card if possible, and writes card details with ratings to rated_cards.json.
 *
 * This only needs to be run when either that card API or ratings sheet changes to rebuild the api file.
 */
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const { getAllCards } = require('./lib/eternal_warcry');
const { rateCards } = require('./utils/card_ratings');

const cardsSpinner = ora('Fetching cards').start();
const ratingSpinner = ora('Rating cards');

Promise.resolve()
  .then(getAllCards)
  .tap(() => cardsSpinner.succeed())
  .catch(err => {
    cardsSpinner.fail();
    throw err;
  })
  .tap(() => ratingSpinner.start())
  .then(allCards => rateCards(allCards))
  .tap(() => ratingSpinner.succeed())
  .catch(err => {
    ratingSpinner.fail();
    throw err;
  })
  .then(rated => {
    return fs.writeFile(
      path.join(__dirname, 'rated_cards.json'),
      JSON.stringify(rated),
      err => console.log('done', err)
    );
  })
  .then(() => console.log('Done writing rated_cards.json'))
  .catch(err => console.error(err));
