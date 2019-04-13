const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const ora = require('ora');
const { rateCards, groupCards } = require('.');
const { getCards } = require('./lib/cards_file');
const { renderToConsole } = require('./lib/terminal');

async function run() {
  try {
    const cards = await getCards();
    const rated = rateCards(cards);
    const groups = groupCards(rated);
    renderToConsole(groups);
  } catch (err) {
    console.error(err);
  }
}

run();
