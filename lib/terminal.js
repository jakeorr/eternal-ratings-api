const { createElement } = require('react');
const blessed = require('blessed');
const { render } = require('react-blessed');
const App = require('../views/app.jsx').default;

function renderToConsole(groups) {
  // Creating our screen
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'eternal-ratings',
  });

  // Adding a way to quit the program
  screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

  // Rendering the React app using our screen
  render(createElement(App, { groups }), screen);
}

module.exports = { renderToConsole };
